import { Component, OnInit } from '@angular/core';
import { BasketSercive } from '../../basket/basket.service';
import { IBasket } from '../../shared/Models/Basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit{

  count : Observable<IBasket>;
  constructor(private basketService : BasketSercive){}

  ngOnInit(): void {
    const basketId = localStorage.getItem("basketId");
    this.basketService.GetBasket(basketId).subscribe({
      next: (res) => {
        console.log(res)
        this.count = this.basketService.basket$;

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
