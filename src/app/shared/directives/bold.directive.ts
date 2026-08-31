import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBold]',
})
export class BoldDirective {

  @HostBinding('style.fontWeight')
  fontWeight = 'normal';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.fontWeight = 'normal';
  }

}
