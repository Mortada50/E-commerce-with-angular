import { HttpInterceptorFn } from '@angular/common/http';
import { Loading } from '../Services/loading';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const _service = inject(Loading)
  _service.loading();

  return next(req).pipe(
    delay(1000),
    finalize(() => {
      _service.hideLoader();
    })
  );
};
