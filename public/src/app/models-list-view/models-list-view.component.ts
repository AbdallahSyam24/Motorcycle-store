import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

import { Model, ModelsService } from '../models.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-models-list-view',
  templateUrl: './models-list-view.component.html',
  styleUrls: ['./models-list-view.component.css'],
})
export class ModelsListViewComponent implements OnInit {
  formData!: Model[];
  offset: number = 0;
  mID!: string;
  successMessage!: string;
  errorMessage!: string;

  constructor(
    private modelsService: ModelsService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.subscribeToAlerts();
  }

  ngOnInit(): void {
    this.loadData();
  }

  subscribeToAlerts(): void {
    this.alertService.successMessage$.subscribe(
      (msg) => (this.successMessage = msg)
    );

    this.alertService.errorMessage$.subscribe(
      (msg) => (this.errorMessage = msg)
    );
  }

  loadData(): void {
    this.mID = this.activatedRoute.snapshot.params['mID'];
    this.modelsService.getAll(this.mID, this.offset).subscribe({
      next: (res) => {
        this.formData = res.data.modles;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  next(): void {
    this.offset += 1;
    this.loadData();
  }

  prev(): void {
    this.offset -= 1;
    this.loadData();
  }

  handleDelete(modleID: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.modelsService.deleteByID(this.mID, modleID).subscribe({
          next: () =>
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success'),
          error: (e) => console.log(e),
          complete: () => this.loadData(),
        });
      }
    });
  }
}
