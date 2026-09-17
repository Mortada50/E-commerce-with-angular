import { Component, OnInit } from '@angular/core';
import { BasketSercive } from '../basket.service';
import { IBasket, IBasketItem } from '../../shared/Models/Basket';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class Basket implements OnInit {
  basket: IBasket;

  constructor(private _service: BasketSercive) {}

  ngOnInit(): void {
    this._service.basket$.subscribe({
      next: (res) => {
        this.basket = res;
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeBasket(item: IBasketItem){
    this._service.removeItemFromBasket(item);
  }

  incrementQuantity(item: IBasketItem){
    this._service.incrementBasketItemQuantity(item);
  }

  decrementQuantity(item: IBasketItem){
    this._service.decrementBasketItemQuantity(item);
  }
}
