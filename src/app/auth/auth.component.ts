import { Component, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { trace } from '@angular/fire/performance';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private readonly userDisposable: Subscription|undefined;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(public readonly auth: AngularFireAuth, @Inject(PLATFORM_ID) platformId: object) {
    if (!isPlatformServer(platformId)) {
      this.userDisposable = this.auth.authState.pipe(
        trace('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }

}
