import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  errorMessage!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.authService.checkToken();
  }
  ngOnInit(): void {
    this.alertService.errorMessage$.subscribe(
      (msg) => (this.errorMessage = msg)
    );
  }

  handleSubmit(registrationForm: NgForm) {
    const registrationData = {
      name:
        registrationForm.value.firstName +
        ' ' +
        registrationForm.value.lastName,
      email: registrationForm.value.email,
      password: registrationForm.value.password,
    };

    const error = this.alertService.validate(registrationData);

    if (error.length === 0) {
      this.authService.registration(registrationData).subscribe({
        next: () =>
          this.alertService.showSuccessMessage('Registration successfully'),
        error: (err) => console.log(err),
      });
      this.router.navigate(['/login']);
    } else {
      this.alertService.showErrorMessage(error);
    }
  }
}
