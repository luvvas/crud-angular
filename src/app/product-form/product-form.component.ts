import { Component } from '@angular/core';
import { CRUDService } from '../services/crud.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  constructor(private crudService: CRUDService) {

  }
}
