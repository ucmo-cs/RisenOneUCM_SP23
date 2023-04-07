import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const routes: Routes = [
  { path: 'top-bar-component', component: TopBarComponent},
  { path: 'login-component', component: LoginComponent},
  { path: 'data-table-component', component: DataTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
