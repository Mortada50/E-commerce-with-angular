import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagnation } from '../shared/Models/Pagnation';
import { ICategory } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';
import { IProduct } from '../shared/Models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {

  constructor(private http: HttpClient) {}

  baseUrl : string = 'https://localhost:44349/api';

  getProducts(ProductParam : ProductParam){
    let param  = new HttpParams();
    if(ProductParam.categoryId){
      param = param.append("categoryId", ProductParam.categoryId);
    }
    if(ProductParam.sortSelected){
      param = param.append("Sort", ProductParam.sortSelected);
    }
    if(ProductParam.search){
      param = param.append("Search", ProductParam.search);
    }
    param = param.append("PageNumber", ProductParam.pageNumber);
    param = param.append("pageSize", ProductParam.pageSize);
    return this.http.get<IPagnation>(`${this.baseUrl}/Products/get-all`, {params: param})
  }

  getCategories () {
    return this.http.get<ICategory[]>(`${this.baseUrl}/Categories/get-all`)
  }

  getProductDetails(id : number){
    return this.http.get<IProduct>(`${this.baseUrl}/Products/get-by-id/${id}`)
  }
}
