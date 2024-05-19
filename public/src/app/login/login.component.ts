import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth, AuthService, User } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData!: User;
  successMessage!: string;
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.subscribeToAlerts();
    this.authService.checkToken();
  }

  subscribeToAlerts(): void {
    this.alertService.successMessage$.subscribe(
      (msg) => (this.successMessage = msg)
    );

    this.alertService.errorMessage$.subscribe(
      (msg) => (this.errorMessage = msg)
    );
  }

  handleSubmit(loginForm: NgForm) {
    const loginData = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    };

    const error = this.alertService.validate(loginData);

    if (error.length === 0) {
      this.authService.login(loginData).subscribe({
        next: (user) => this.setData(user),
        error: (error) =>
          this.alertService.showErrorMessage([
            'Please check email or password!',
          ]),
      });
    } else {
      this.alertService.showErrorMessage(error);
    }
  }

  setData(user: any): void {
    this.formData = user.data;
    this.authService.isLogin = true;
    localStorage.setItem('token', this.formData.token);
    window.location.reload();
  }
}
