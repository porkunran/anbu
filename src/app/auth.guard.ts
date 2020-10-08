import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private apiService: CommonService, private router: Router) { }


  canActivate(): boolean {
      if (this.apiService.loggedIn()) {
        return true;
      } else {
        this.router.navigate(['/admin/login']);
        return false;
      }

  }

}
