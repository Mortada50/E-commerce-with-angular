import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/product';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.html',
  styleUrl: './shop-item.scss',
})
export class ShopItem {
  @Input() productItem : IProduct;
}
