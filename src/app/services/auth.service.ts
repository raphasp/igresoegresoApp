import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as AuthActions from '../auth/auth.action';
import * as IngresoEgresoAction from '../ingreso-egreso/ingreso-egreso.actions';

import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userStoreSubscription: Subscription;
  private _userGlobal: User;

  get userGlobal() {
    return {...this._userGlobal}
  }

  constructor(
    public authFireBase: AngularFireAuth,
    private fireStore: AngularFirestore,
    private _stoteRedux: Store<AppState>
  ) { }

  initAuthListener = () =>{
    this.authFireBase.authState.subscribe(fUser => {
      //console.log(firebaseUser?.uid);
      if (fUser) {
        
        this. userStoreSubscription = this.fireStore.doc(`${fUser.uid}/usuario`)
          .valueChanges()
          .subscribe((UsuarioFireStore: any) => {
            const user = User.fromFirebase(UsuarioFireStore)
            this._userGlobal = user;
            this._stoteRedux.dispatch(AuthActions.setUser({user}));
          });
        
      } else {
        console.log('llamar al unset del user');
        this._userGlobal = null;
        try {
          this.userStoreSubscription.unsubscribe();
        } catch (error) {
          console.log(`Error : ${error}`);
        }
        this._stoteRedux.dispatch(AuthActions.unSetUser());
        this._stoteRedux.dispatch(IngresoEgresoAction.unsetItem());
        
      }
      //this._stoteRedux.dispatch(AuthActions.setUser());
    });
  }

  createUser(nombre: string, email:string, password: string){
    return this.authFireBase.auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) =>{
      const newUser = new User(user.uid, nombre, user.email);
      console.log(newUser);
      return this.fireStore.doc(`${ user.uid }/usuario`).set({ ...newUser });
    });
  }

  loginUser(email:string, password:string){
    return this.authFireBase.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    return this.authFireBase.auth.signOut();
  }

  isAuth= ():Observable<boolean> =>{
    return this.authFireBase.authState.pipe(
      map(firebUser => firebUser!=null)
    );
  }

}
