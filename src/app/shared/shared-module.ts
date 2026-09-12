import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Pagnation } from './components/pagnation/pagnation';

@NgModule({
  declarations: [Pagnation],
  imports: [CommonModule, PaginationModule],
  exports: [
    PaginationModule,
    Pagnation
  ],
})
export class SharedModule {}
