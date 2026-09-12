import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-pagnation',
  standalone: false,
  templateUrl: './pagnation.html',
  styleUrl: './pagnation.scss',
})
export class Pagnation {
  @Input() pageSize: number;
  @Input() totalCount: number;

  @Output() pageChange = new EventEmitter();

  onChangePage(event : any){
    this.pageChange.emit(event);
  }
}
