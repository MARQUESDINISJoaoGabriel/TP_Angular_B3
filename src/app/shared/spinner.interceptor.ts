import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs/operators';

export const spinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const spinner = inject(SpinnerService);
  spinner.show();
  return next(req).pipe(finalize(() => spinner.hide()));
};