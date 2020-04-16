import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit,OnDestroy {
  userSubscription: Subscription;
  userdata: User;
  constructor(
    private _storrRedux:Store<AppState>
  ) { }

  ngOnInit() {
    this.userSubscription= this._storrRedux.select('user')
      .pipe(
        filter(({user})=> user !==null )
      )
      .subscribe(({user})=>{
          this.userdata = user;
        });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubscription.unsubscribe();
  }

}
