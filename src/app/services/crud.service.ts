import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from "../crud/models/http-response";
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  constructor(private httpClient: HttpClient) { }
  
  loadProducts() {
    const url = environment.API_EndPoint + 'view.php';
    return this.httpClient.get(url).pipe(map(data => data))
  }

  createProduct(data: any): Observable<HttpResponse> {
    const url = environment.API_EndPoint + 'create.php';
    return this.httpClient.post<HttpResponse>(url, data).pipe(map(data => data))
  }
}
