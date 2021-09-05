import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';
import { CreateAccountComponent } from './pages/account/create-account/create-account.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  { path: 'account/create', component: CreateAccountComponent },
  { path: 'account/edit/:_id', component: EditAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
