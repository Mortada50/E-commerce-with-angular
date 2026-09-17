import { Component, OnInit } from '@angular/core';
import { IBasketTotal } from '../../Models/Basket';
import { BasketSercive } from '../../../basket/basket.service';

@Component({
  selector: 'app-order-total',
  standalone: false,
  templateUrl: './order-total.html',
  styleUrl: './order-total.scss',
})
export class OrderTotal implements OnInit {

  basketTotals: IBasketTotal;

  constructor(private _service : BasketSercive){}

  ngOnInit(): void {
   this._service.basketTotal$.subscribe({
    next: (res) => {
      this.basketTotals = res;
    },
    error: (err) => {
      console.log(err);
    }
   })
  }
}
