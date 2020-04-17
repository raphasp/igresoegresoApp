import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/registern/registern.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'register', 
        component: RegisterComponent
    },
    {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () => import('./ingreso-egreso/igreso-egreso.module')
                    .then(m => m.IgresoEgresoModule)
    },
    {
        path: '**', 
        redirectTo: ''
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{

}