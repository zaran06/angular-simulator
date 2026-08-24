import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login(): void {
    const formValue = this.loginForm.getRawValue();

    const username = formValue.username ?? '';
    const password = formValue.password ?? '';

    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },

      error: (error) => {
        if (error.status < 500) {
          this.messageService.showError('Неверный логин или пароль.');
        }
      },
    });
  }
}
