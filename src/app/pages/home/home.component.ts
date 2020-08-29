import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  users: Array<any> = null;
  user: any;

  constructor(
    public auth: AuthService,
    public readonly firebaseApp: FirebaseApp,
    private notifications: NotificationsService,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    this.firebase.getCollection('users').subscribe(data => {
      this.users = data.map(e => {
        return e.payload.doc.data();
      });
      console.log('this.users', this.users);
    });
    const user = this.auth.user;
    if (user) {
      this.firebase.getDocument('users', user?.id).subscribe(data => {
        this.user = data.data();
        console.log('this.user', this.user);
      });
    }
  }

  ngAfterViewInit(): void {
    this.notifications.success('', 'HOME PAGE LOADED');
  }

}
