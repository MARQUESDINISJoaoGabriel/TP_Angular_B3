import { Directive, ElementRef, HostListener  } from "@angular/core";

@Directive({
  selector: '[pkmnBorderCard]',
  standalone: true
})
export class BorderCardDirective{
  
  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultBgColor: string = '#01b7a5ff';
  private initialBgColor: string = '#ffffff';
  private defaultHeight: number = 200;
  

  constructor(private el: ElementRef){
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
    this.setBackground(this.initialBgColor);
    this.el.nativeElement.style.transition = 'transform 0.2s ease-in-out';
  }
  //quand je survol l'élément
  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.defaultColor);
    this.setBackground(this.defaultBgColor);
    this.el.nativeElement.style.transform = 'scale(1.05)';
  }
  //quand je pars de l'élément
  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
    this.setBackground(this.initialBgColor);
     this.el.nativeElement.style.transform = 'scale(1)';
  }
  private setBorder(color:string){
    let border = 'solid 4px'+ color;
    this.el.nativeElement.style.border = border;
  }
  private setHeight(height: number){
    this.el.nativeElement.style.height = height+'px';
  }

  private setBackground(background: string){
    this.el.nativeElement.style.background = background;
  }



}