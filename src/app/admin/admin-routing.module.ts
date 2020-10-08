import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OrderComponent } from './order/order.component';
import { DetailviewComponent } from './detailview/detailview.component';
import { TotalOrderComponent } from './total-order/total-order.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'order', component: OrderComponent },
  { path: 'detail', component: DetailviewComponent },
  { path: 'report', component: TotalOrderComponent },
  { path: 'edit', component: EditComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
