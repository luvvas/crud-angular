import { CRUDService } from '../services/crud.service';

import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  rowData: any = [];

  gridOptions = {
    rowHeight: 59
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "p_name", headerName: "Product Name", sortable: true, headerClass: "header-cell" },
    { field: "p_price", headerName: "Product Price", sortable: true, headerClass: "header-cell" },
    { field: "p_description", headerName: "Product Description", sortable: true, headerClass: "header-cell" },
    { field: "", headerName: "Actions", headerClass: "header-cell", width: 250, cellRenderer: this.actionRender }
  ];

  productList: any = [];
  productListSubscribe: any;

  constructor(private crudService: CRUDService) {
  }

  ngOnInit(): void {
    this.getProductList()
  }

  getProductList() {
    this.productListSubscribe = this.crudService.loadProducts().subscribe(res => {
      this.productList = res;
      this.rowData = res
    })
  }

  actionRender(params: any) {
    let div = document.createElement('div');
    let htmlCode = '<button type="button" class="btn btn-success">View</button>\n' +
    '<button type="button" class="btn btn-danger">Delete</button>\n' +
    '<button type="button" class="btn btn-warning">Edit</button>'

    div.innerHTML = htmlCode;
    return div;
  }
}
