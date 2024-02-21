import { NgModule, Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColDef } from 'ag-grid-community';

import { CRUDRoutingModule } from './crud-routing.module';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { AgGridAngular } from 'ag-grid-angular';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    CRUDRoutingModule,
    AgGridAngular
  ]
})
export class CRUDModule { }
