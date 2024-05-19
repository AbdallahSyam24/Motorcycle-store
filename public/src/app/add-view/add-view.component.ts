import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { HomeService, Manufacture } from '../home.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-add-view',
  templateUrl: './add-view.component.html',
  styleUrls: ['./add-view.component.css'],
})
export class AddViewComponent implements OnInit {
  formData!: Manufacture;
  errorMessage!: string;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.alertService.errorMessage$.subscribe(
      (msg) => (this.errorMessage = msg)
    );
  }

  handleSubmit(createData: NgForm): void {
    const updatedData = {
      name: createData.value.name,
      country: createData.value.country,
      year: createData.value.year,
      logo: createData.value.logo,
    };

    const error = this.alertService.validate(updatedData);

    if (error.length === 0) {
      this.homeService.create(updatedData).subscribe({
        next: () =>
          this.alertService.showSuccessMessage(
            updatedData.name[0].toUpperCase() +
              updatedData.name.slice(1) +
              ' added successfuly'
          ),
        error: (e) => this.alertService.showErrorMessage([`${e.message}`]),
      });
      this.router.navigate(['/']);
    } else {
      this.alertService.showErrorMessage(error);
    }
  }
}
