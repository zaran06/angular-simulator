import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhonePipe } from '../../shared/pipes/phone.pipe';
import { BoldDirective } from '../../shared/directives/bold.directive';
import { GradientDirective } from '../../shared/directives/gradient.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, BoldDirective, GradientDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;

  @Output() deleteUser = new EventEmitter<number>();

  onDeleteClick() {
    this.deleteUser.emit(this.user.id);
  }

}
