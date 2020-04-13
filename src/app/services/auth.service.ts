import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public authFireBase: AngularFireAuth,
    public fireStore: AngularFirestore
  ) { }

  initAuthListener = () =>{
    this.authFireBase.authState.subscribe(firebaseUser => {
      console.log('holas');
      console.log(firebaseUser);
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
