import { Component } from '@angular/core';
import { CRUDService } from '../services/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  // @ts-ignore
  productForm: FormGroup;


  constructor(private crudService: CRUDService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createProductForm()
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      'price': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])]
    })
  }
}
