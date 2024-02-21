import { Component } from '@angular/core';
import { CRUDService } from '../services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../crud/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  // @ts-ignore
  productDetails: Product;

  constructor(private crudService: CRUDService, 
              private activatedRoute: ActivatedRoute ) {
  }
  
  ngOnInit(): void {
    let productId = '';
    if(this.activatedRoute.snapshot.params['productId']) {
      productId = this.activatedRoute.snapshot.params['productId'];
      if(productId !== '') {
        this.loadProductDetails(productId)
      }
    }
  }

  loadProductDetails(productId: any) {
    this.crudService.loadProductInfo(productId).subscribe(res => {
      this.productDetails = res;
    })
  }
}
