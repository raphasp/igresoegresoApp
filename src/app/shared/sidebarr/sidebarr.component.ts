import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebarr.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  userdata: User;
  userSubscription:Subscription;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _storeRedux: Store<AppState>
  ) { }

  ngOnInit() {
    this.userSubscription = this._storeRedux.select('user')
      .pipe(
        filter( ({user}) => user !== null)
      )
      .subscribe( ({user}) => {
        this.userdata = user;
      });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubscription.unsubscribe();
  }

  logOut= ():void => {
    console.log('logout');
    Swal.fire({
      title: 'Cerrando Sesión',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this._authService.logOut().then(response => {
      Swal.close();
        this._router.navigate(['/login']);
    }).catch(error => {
      //console.error(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    })
  }
}
