import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/product';
import { BasketSercive } from '../../basket/basket.service';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.html',
  styleUrl: './shop-item.scss',
})
export class ShopItem {

  constructor(private _service : BasketSercive){}

  @Input() productItem : IProduct;

  SetBasketValue(){
    this._service.AddItemToBasket(this.productItem)
  }
}
