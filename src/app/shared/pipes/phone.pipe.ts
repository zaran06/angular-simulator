import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string | number, mode: string): string {
    const clearNumber = String(value).replace(/\D/g, '');

    if (clearNumber.length !== 12) {
      return String(value);
    }

    const country = clearNumber.slice(0, 2);
    const operator = clearNumber.slice(2, 5);
    const part1 = clearNumber.slice(5, 8);
    const part2 = clearNumber.slice(8, 10);
    const part3 = clearNumber.slice(10, 12);

    if (mode === 'compact') {
      return `+${clearNumber}`;
    }

    if (mode === 'international') {
      return `+${country} ${operator} ${part1} ${part2} ${part3}`;
    }

    if (mode === 'national') {
      return `${operator} ${part1} ${part2} ${part3}`;
    }

    if (mode === 'masked') {
      return `+${country} ${operator} *** ** ${part3}`;
    }

    return String(value);
  }
}
