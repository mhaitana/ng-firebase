import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { auth, User as FirebaseUser } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User as UserModel } from '../models/user.model';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<FirebaseUser>;
  redirectTo: string;
  payments: Array<any> = [];
  credits: Array<any> = [];

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    private route: ActivatedRoute,
    public ngZone: NgZone,
    private notifications: NotificationsService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          let uid = user.providerData[0].uid;
          if (uid.includes('@')) {
            uid = user.uid;
          }
          return this.afs.doc<FirebaseUser>(`users/${uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.user$.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
    this.route.queryParams.subscribe(params => {
      this.redirectTo = params.redirect_to;
    });
  }


  async login(details): Promise<any> {
    return await this.afAuth
      .signInWithEmailAndPassword(details.email, details.password)
      .then(async credential => {
        const user = new UserModel(
          credential.user.uid,
          credential.user.email,
          credential.user.displayName,
          credential.user.photoURL,
          credential.user.emailVerified
        );
        await this.updateUserData(user);
        this.ngZone.run(() => {
          this.notifications.success('Login Successful');
          this.router.navigate([this.redirectTo || '/profile']);
        });
      })
      .catch(err => {
        console.error(err);
        this.notifications.error(err.message);
      });
  }

  async facebookSignin(): Promise<any> {
    const credential = await this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
    const profile: any = credential.additionalUserInfo.profile;

    const user = new UserModel(
      profile.id,
      profile.email,
      profile.name,
      profile.picture.data.url,
      credential.user.emailVerified
    );
    await this.updateUserData(user);
    this.ngZone.run(() => {
      this.router.navigate([this.redirectTo || '/profile']);
    });
  }

  async loginGoogle(): Promise<any> {
    const credential = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    const profile: any = credential.additionalUserInfo.profile;

    const user = new UserModel(
      profile.id,
      profile.email,
      profile.name,
      profile.picture,
      credential.user.emailVerified
    );
    await this.updateUserData(user);
    this.ngZone.run(() => {
      this.router.navigate([this.redirectTo || '/profile']);
    });
  }

  async register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (credential) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.sendEmailVerification();
        const user = new UserModel(
          credential.user.uid,
          credential.user.email,
          credential.user.displayName,
          credential.user.photoURL,
          credential.user.emailVerified
        );
        await this.updateUserData(user);
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        });
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  async sendEmailVerification(): Promise<any> {
    const actionCodeSettings = {
      url: environment.emailVerificationRedirectUrl
    };
    await (await this.afAuth.currentUser).sendEmailVerification(actionCodeSettings);
    this.ngZone.run(() => {
      this.router.navigate(['/verify-email']);
    });
  }

  async sendPasswordResetEmail(passwordResetEmail: string): Promise<any> {
    const actionCodeSettings = {
      // After password reset, the user will be give the ability to go back
      // to this page.
      url: environment.passwordRedirectUrl,
      handleCodeInApp: false
    };
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail, actionCodeSettings);
  }

  async logout(): Promise<any> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
    });
  }

  private async updateUserData(user: UserModel): Promise<any> {
    const firebaseUser = await this.getFirebaseUser(user.id);
    for (const key in user) {
      if (key in firebaseUser && user[key] !== '') {
        firebaseUser[key] = user[key];
      }
    }
    if (!firebaseUser.timestamp) {
      firebaseUser.timestamp = new Date(Date.now());
    }
    return this.setFirebaseUser(firebaseUser, user.id);
  }

  async setFirebaseUser(data: any, id: any): Promise<any> {
    const userRef: AngularFirestoreDocument<FirebaseUser> = this.afs.doc(`users/${id}`);
    return userRef.set(data, { merge: true });
  }

  async getFirebaseUser(id: any): Promise<any> {
    const userRef: AngularFirestoreDocument<FirebaseUser> = this.afs.doc(`users/${id}`);
    return await userRef.ref.get().then(doc => {
      if (doc.exists) {
        return new UserModel().fromJson(doc.data()).toJson();
      } else {
        return new UserModel().toJson();
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  get user(): any {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      return new UserModel().fromJson(localUser).toJson();
    }
    return {};
  }
}
