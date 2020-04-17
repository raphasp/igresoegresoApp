import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgresoClass } from 'src/app/models/inglesoegreso.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;

  totalEgreso:number = 0;
  totalIngreso: number = 0;

  public doughnutChartLabels: Label[] = ['Ingreso', 'Egreso'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private _storeRedux:Store<AppStateWithIngreso>
  ) { }

  ngOnInit() {
    this._storeRedux.select('ingresosEgresos')
    .subscribe(({items})=>{
      this.generateStadistic(items);
    });
  }

  generateStadistic = (items: IngresoEgresoClass[]):void => {
      this.totalEgreso = 0;
      this.totalIngreso = 0;
      this.ingresos = 0;
      this.egresos = 0;
      items.forEach(element => {
        if (element.tipo === 'ingreso') {
          this.totalIngreso += element.monto;
          this.ingresos ++
        } else {
          this.totalEgreso += element.monto;
          this.egresos ++
        }
      });

      this.doughnutChartData = [[this.totalIngreso, this.totalEgreso]]
  }

}
