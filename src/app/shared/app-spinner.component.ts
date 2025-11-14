import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: 'app-spinner.component.html',
  imports: [
    CommonModule, // pour utiliser ngIf et ngFor
  ],
})
export class AppSpinnerComponent {
  loading$: Observable<boolean>;
  constructor(spinner: SpinnerService) { this.loading$ = spinner.loading$; }
}
