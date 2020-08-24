import { AfterViewInit, ApplicationRef, Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'NG_PROJECT';

  constructor(
    public readonly firebaseApp: FirebaseApp,
    appRef: ApplicationRef,
    public auth: AuthService
  ) {
    appRef.isStable.subscribe(it => console.log('isStable', it));
    console.log(firebaseApp.name);
    console.log(auth.isLoggedIn);
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    if (!environment.production) {
      document.title = document.title + ' (' + environment.environment + ')';
    }
  }
}
