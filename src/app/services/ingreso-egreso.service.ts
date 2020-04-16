import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoClass } from '../models/inglesoegreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private _fireStore: AngularFirestore,
    private _authService: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgresoC: IngresoEgresoClass){
    const uid= this._authService.userGlobal.uid;
    return this._fireStore.doc(`${ uid }/ingreso-egreso`)
            .collection('items')
            .add({ ...ingresoEgresoC });
  }

  initIngresoEgresoListener(uid: string){
    return this._fireStore.collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => {
          return snapshot.map( doc => {
            return{ 
              uid: doc.payload.doc.id,
              ... doc.payload.doc.data() as any
            }
          })
        })
      );
      // .subscribe(list =>{
      //   console.log(list);
      // });
  }

  deleteItemIngresoEgreso = (uidItem: string):Promise<void> => {
    const uid = this._authService.userGlobal.uid;
    return this._fireStore.doc(`${ uid }/ingresos-egresos/items/${ uidItem }`).delete();
  }
}
