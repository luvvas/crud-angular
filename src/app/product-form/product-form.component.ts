import { Component } from '@angular/core';
import { CRUDService } from '../services/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  // @ts-ignore
  productForm: FormGroup;

  constructor(private crudService: CRUDService, 
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute 
              ) {}

  ngOnInit(): void {
    this.createProductForm()
    let productId = '';
    if(this.activatedRoute.snapshot.params['productId']) {
      productId = this.activatedRoute.snapshot.params['productId'];
      if(productId !== '') {
        this.loadProductDetails(productId)
      }
    }
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      'price': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])]
    })
  }

  createProduct(values: any, isUpdate: any) {
    // console.log(values);
    let formData = new FormData();
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('price', values.price)

    if(isUpdate) {
      // for update product details
    }  else {
      this.crudService.createProduct(formData).subscribe(res => {
        if (res.result === 'success') {
          console.log('eeee')
          this.router.navigate(['/crud/product-list'])
        }
      })
    }
  }

  loadProductDetails(productId: any) {
    this.crudService.loadProductInfo(productId).subscribe(res => {
      
    })
  }
}
