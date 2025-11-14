import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styles: [`
    .splash {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      z-index: 9999;
      flex-direction: column;
    }
    .splash img {
      width: 120px;
      margin-bottom: 15px;
    }
  `]
})
export class SplashComponent implements OnInit {
  show = true;

  ngOnInit() {
    setTimeout(() => this.show = false, 1200);
  }
}
