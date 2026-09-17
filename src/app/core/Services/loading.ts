import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class Loading {
  requestCount = 0;
  constructor(private _service: NgxSpinnerService) {}
  loading() {
    this.requestCount++;
    this._service.show(undefined, {
      bdColor: 'rgba(0,0,0,0.8)',
      size: 'large',
      color: '#ffffff',
      type: 'ball-spin-clockwise',
      fullScreen: true,
    });
  }

  hideLoader() {
    this.requestCount--;
    if (this.requestCount == 0) {
      this.requestCount = 0;
      this._service.hide();
    }
  }
}
