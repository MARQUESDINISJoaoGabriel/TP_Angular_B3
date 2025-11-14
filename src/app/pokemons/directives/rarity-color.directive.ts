import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rarityColor]'
})
export class RarityColorDirective implements OnChanges {
  @Input('rarityColor') rarity: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    const r = this.rarity || 1;
    let bg = '';
    switch (Math.round(r)) {
      case 1: bg = '#f8f9fa'; break; // commun
      case 2: bg = '#dff0d8'; break; // peu commun
      case 3: bg = '#d9edf7'; break; // rare
      case 4: bg = '#fbeed5'; break; // épique
      case 5: bg = '#f2dede'; break; // légendaire
      default: bg = '#ffffff';
    }
    this.renderer.setStyle(this.el.nativeElement, 'background-color', bg);
  }
}
