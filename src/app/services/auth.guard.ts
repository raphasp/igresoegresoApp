import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ){}
  canActivate(): Observable<boolean> {
    return this._authService.isAuth().pipe(
      tap(state => {
        if(!state){ this._router.navigate(['/login'])}
      })
    );
  }
  
}
