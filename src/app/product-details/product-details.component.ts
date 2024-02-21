import { Component } from '@angular/core';
import { CRUDService } from '../services/crud.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private crudService: CRUDService) {
  }
}
