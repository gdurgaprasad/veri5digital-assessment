import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor( private http: HttpClient) {}

  public getAvailableProducts(): any {
    return this.http.get('/assets/data.json');
  }

}
