import { AfterViewInit, ApplicationRef, Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'NG_PROJECT';

  constructor(public readonly firebaseApp: FirebaseApp, appRef: ApplicationRef) {
    appRef.isStable.subscribe(it => console.log('isStable', it));
    console.log(firebaseApp.name)
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    if (!environment.production) {
      document.title = document.title + ' (' + environment.environment + ')';
    }
  }
}
