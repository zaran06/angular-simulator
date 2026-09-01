import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';

import { IGradientConfiguration } from '../../../interfaces/IGradientConfiguration';

@Directive({
  selector: '[appGradient]',
})
export class GradientDirective implements OnDestroy {

  @Input()
  GradientConfiguration: IGradientConfiguration = {};

  private timerId: ReturnType<typeof setTimeout> | null = null;

  private renderer = inject(Renderer2);

  private elementRef = inject(ElementRef<HTMLElement>);

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.clearTimer();

    const delay = this.GradientConfiguration.delay ?? 1000;

    this.timerId = setTimeout(() => {
      this.addGradient();
      this.timerId = null;
    }, delay);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.clearTimer();
    this.removeGradient();
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.removeGradient();
  }

  private addGradient(): void {
    const element = this.elementRef.nativeElement;

    const thickness = this.GradientConfiguration.thickness ?? '2px';

    const colors = this.GradientConfiguration.colors ?? ['red', 'orange', 'purple', 'blue', 'red'];

    const gradientColors = colors.join(', ');

    this.renderer.setStyle(element, 'border', `${ thickness } solid transparent`);

    this.renderer.setStyle(
      element,
      'background',
      `
        linear-gradient(#ffffff, #ffffff) padding-box,
        linear-gradient(90deg, ${ gradientColors }) border-box
      `,
    );

    this.renderer.setStyle(element, 'background-size', '100% 100%, 300% 300%');

    this.renderer.setStyle(element, 'background-position', '0 0, 0% 50%');

    this.renderer.setStyle(element, 'background-repeat', 'no-repeat');

    this.renderer.setStyle(element, 'animation', 'gradientBorder 3s linear infinite');
  }

  private removeGradient(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.removeStyle(element, 'border');
    this.renderer.removeStyle(element, 'background');
    this.renderer.removeStyle(element, 'background-size');
    this.renderer.removeStyle(element, 'background-position');
    this.renderer.removeStyle(element, 'background-repeat');
    this.renderer.removeStyle(element, 'animation');
  }

  private clearTimer(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

}
