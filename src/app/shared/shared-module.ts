import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Pagnation } from './components/pagnation/pagnation';
import { OrderTotal } from './components/order-total/order-total';

@NgModule({
  declarations: [Pagnation, OrderTotal],
  imports: [CommonModule, PaginationModule],
  exports: [PaginationModule, Pagnation, OrderTotal],
})
export class SharedModule {}
