import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {
  @Output() filterChange = new EventEmitter<string>();
  filterControl = new FormControl('');

  ngOnInit() {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.filterChange.emit(value || '');
      })
  }
}
