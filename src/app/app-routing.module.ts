import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './auth.guard';
import { PriceListComponent } from './price-list/price-list.component';


const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: '',   redirectTo: '/shop', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {path: 'pricelist', component: PriceListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
