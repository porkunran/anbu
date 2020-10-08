import { Component, ApplicationRef } from '@angular/core';
import { CommonService } from './common.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

// import { Location } from '@angular/common';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'anbutradecorp';
  location: Location;
  logedIn: boolean;


  constructor( private apiService: CommonService, private router: Router, private updated: SwUpdate, private appRef: ApplicationRef) {
    // if (environment.production) {
    //   if (location.protocol === 'http:') {
    //     window.location.href = location.href.replace('http', 'https');
    //   }
    // }
    this.updateClient();
    // this.checkupdate();
    this.logedIn = this.apiService.loggedData;
  }
  updateClient() {
    if (!this.updated.isEnabled) {
      return;
    } else {
    this.updated.available.subscribe((event) => {
      console.log('current', event.current, 'avilable', event.available);
      if (confirm('update is avialble for the app please confirm')) {
        this.updated.activateUpdate().then(() => location.reload());
      }
    });
    this.updated.activated.subscribe((event) => {
      console.log('current', event.previous, 'avilable', event.current);
    });
  }
  }
   isValid(): boolean {
    return this.apiService.loggedIn();
  }
  Logout() {
    sessionStorage.clear();
    this.router.navigate(['/shop']);
  }
// checkupdate() {
// this.appRef.isStable.subscribe((isStable) => {
// if (isStable) {
//   const timeInterval = interval(60000);
//   timeInterval.subscribe(() => {
//     this.updated.checkForUpdate().then(() => console.log('checked'));
//     console.log('updateChecked');
//   });
// }
// });
// }
}
