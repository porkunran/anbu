import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OrderComponent } from './order/order.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';
import { DetailviewComponent } from './detailview/detailview.component';
import { TotalOrderComponent } from './total-order/total-order.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { EditComponent } from './edit/edit.component';


import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [AdminComponent, OrderComponent, ConfirmComponent, DetailviewComponent, TotalOrderComponent, EditComponent, LoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatDividerModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatRadioModule
  ],
  entryComponents: [ConfirmComponent]

})
export class AdminModule { }
