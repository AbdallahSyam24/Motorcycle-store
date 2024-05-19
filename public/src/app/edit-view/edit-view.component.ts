import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HomeService, Manufacture } from '../home.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css'],
})
export class EditViewComponent implements OnInit {
  formData!: Manufacture;
  #id!: string;
  errorMessage!: string;

  constructor(
    private homeService: HomeService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.alertService.errorMessage$.subscribe(
      (msg) => (this.errorMessage = msg)
    );
    this.loadData();
  }

  loadData(): void {
    this.#id = this.activeRouter.snapshot.params['id'];
    this.homeService.getByID(this.#id).subscribe({
      next: (res) => {
        this.formData = res.data;
      },
      error: (e) => console.log(e),
    });
  }

  handleSubmit(editData: NgForm): void {
    const updatedData = {
      name: editData.value.name,
      country: editData.value.country,
      year: editData.value.year,
      logo: editData.value.logo,
    };

    const error = this.alertService.validate(updatedData);

    if (error.length === 0) {
      this.homeService.updateByID(this.#id, updatedData).subscribe({
        next: () =>
          this.alertService.showSuccessMessage(
            updatedData.name[0].toUpperCase() +
              updatedData.name.slice(1) +
              ' updated successfuly'
          ),
        error: (e) => this.alertService.showErrorMessage([`${e.message}`]),
      });

      this.router.navigate(['/']);
    } else {
      this.alertService.showErrorMessage(error);
    }
  }
}
