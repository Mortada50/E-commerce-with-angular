import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../shared/Models/product';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit{

  product : IProduct;
  mainImage : string;

  constructor(private shopService: ShopService, private route: ActivatedRoute){}

  ngOnInit(): void {
   this.loadProduct();
  }

  loadProduct(){
    this.shopService
    .getProductDetails(parseInt(this.route.snapshot.paramMap.get("id")))
    .subscribe({
      next: (res) => {
        this.product = res;
        this.mainImage = this.product.photo[0].imageName;
      }
    })
  }

  replaceImage(src : string){
    this.mainImage = src;
  }

}
