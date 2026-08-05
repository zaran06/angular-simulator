import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  transform(value: number, ...args: string[]): string {
    const [one, few, many] = args;

    const lastTwoDigits = value % 100;
    const lastDigits = value % 10;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return many;
    }
    if (lastDigits === 1) {
      return one;
    }
    if (lastDigits === 2 || lastDigits === 3 || lastDigits === 4) {
      return few;
    }
    return many;
  }
}
