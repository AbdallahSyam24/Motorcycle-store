import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Model, ModelsService } from '../models.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-models-edit-view',
  templateUrl: './models-edit-view.component.html',
  styleUrls: ['./models-edit-view.component.css'],
})
export class ModelsEditViewComponent implements OnInit {
  formData!: Model;
  logo!: File;
  mID!: string;
  id!: string;
  errorMessage!: string;

  constructor(
    private modelsService: ModelsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.alertService.errorMessage$.subscribe(
      (msg) => (this.errorMessage = msg)
    );
    this.loadData();
  }

  loadData(): void {
    this.mID = this.activatedRoute.snapshot.params['mID'];
    this.id = this.activatedRoute.snapshot.params['id'];
    this.modelsService.getByID(this.mID, this.id).subscribe({
      next: (res) => {
        this.formData = res.data;
      },
      error: (e) => console.log(e),
    });
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
      this.modelsService.updateByID(this.mID, this.id, updatedData).subscribe({
        next: () =>
          this.alertService.showSuccessMessage(
            updatedData.name[0].toUpperCase() +
              updatedData.name.slice(1) +
              ' updated successfuly'
          ),
        error: (e) => console.log(e),
      });
      this.router.navigate([`/${this.mID}/models`]);
    } else {
      this.alertService.showErrorMessage(error);
    }
  }
}
