import { CRUDService } from '../services/crud.service';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import Swal from 'sweetalert2';

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
    { field: "p_price", headerName: "Product Price", sortable: true, headerClass: "header-cell", cellRenderer: this.priceCellRender.bind(this) },
    { field: "p_description", headerName: "Product Description", sortable: true, headerClass: "header-cell" },
    { field: "", headerName: "Actions", headerClass: "header-cell", width: 250, cellRenderer: this.actionRender.bind(this) }
  ];

  productList: any = [];
  productListSubscribe: any;

  constructor(private crudService: CRUDService, private router: Router) {
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

    // handle view button
    let viewButton = div.querySelector('.btn-success')
    //@ts-ignore
    viewButton?.addEventListener('click', () => {
      this.viewProductDetails(params)
    })
  
    // handle edit button
    let editButton = div.querySelector('.btn-warning')
    //@ts-ignore
    editButton?.addEventListener('click', () => {
      this.editProductDetails(params)
    })

    // handle delete button
    let deleteButton = div.querySelector('.btn-danger')
    //@ts-ignore
    deleteButton?.addEventListener('click', () => {
      this.deleteProductDetails(params)
    })
    return div;
  }

  viewProductDetails(params: any) {
    this.router.navigate(['/crud/view-product-details/' + params.data.p_id])
  }

  editProductDetails(params: any) {
    this.router.navigate(['/crud/update-product/' + params.data.p_id])
  }

  deleteProductDetails(params: any) {
    const that = this;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result: any) => {
      if (result.isConfirmed) {
        that.crudService.deleteProduct(params.data.p_id).subscribe(res => {
          if(res.result === 'success') {
            this.getProductList()
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          }
        })
      }
    });
  }

  priceCellRender(params: any) {
    return '$ ' + params.data.p_price
  }
}
