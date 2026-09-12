import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shop } from './shop';
import { ShopItem } from './shop-item/shop-item';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [Shop, ShopItem],
  imports: [CommonModule, SharedModule],
  exports: [Shop],
})
export class ShopModule {}
