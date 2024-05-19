import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Model, ModelsService } from '../models.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-models-add-view',
  templateUrl: './models-add-view.component.html',
  styleUrls: ['./models-add-view.component.css'],
})
export class ModelsAddViewComponent implements OnInit {
  formData!: Model;
  logo!: File;
  mID: string;
  errorMessage!: string;

  constructor(
    private modelsService: ModelsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.mID = this.activatedRoute.snapshot.params['mID'];
  }
  ngOnInit(): void {
    this.alertService.errorMessage$.subscribe(
      (msg) => (this.errorMessage = msg)
    );
  }

  onFilechange(event: any) {
    this.logo = event.target.files[0];
  }

  handleSubmit(createData: NgForm): void {
    const updatedData = {
      name: createData.value.name,
      cc: createData.value.cc,
      year: createData.value.year,
      // logo: this.logo,
    };
    const error = this.alertService.validate(updatedData);

    if (error.length === 0) {
      this.modelsService.create(this.mID, updatedData).subscribe({
        next: () =>
          this.alertService.showSuccessMessage(
            updatedData.name[0].toUpperCase() +
              updatedData.name.slice(1) +
              ' added successfuly'
          ),
        error: (e) => console.log(e),
      });
      this.router.navigate([`/${this.mID}/models`]);
    } else {
      this.alertService.showErrorMessage(error);
    }
  }
}
