import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HomeService, Manufacture } from '../home.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formData!: Manufacture[];
  offset: number = 0;
  successMessage!: string;
  errorMessage!: string;

  constructor(
    private homeService: HomeService,
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
    this.homeService.getAll(this.offset).subscribe({
      next: (res) => (this.formData = res.data),
      error: (e) => console.log(e),
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

  handleDelete(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.homeService.deleteByID(id).subscribe({
          next: () =>
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success'),
          error: (e) => console.log(e),
          complete: () => this.loadData(),
        });
      }
    });
  }
}
