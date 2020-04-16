import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoClass } from '../models/inglesoegreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgresoClass[]): IngresoEgresoClass[] {
    let lisitem = items.slice().sort( (a, b) =>{
      if(a.tipo === 'ingreso'){
        return -1;
      }else{
        return 1;
      }
    });
    console.log(lisitem);
    return lisitem;
  }

}
