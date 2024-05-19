import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private successMessageSubject = new Subject<string>();
  private errorMessageSubject = new Subject<string>();

  successMessage$ = this.successMessageSubject.asObservable();
  errorMessage$ = this.errorMessageSubject.asObservable();

  showSuccessMessage(message: string) {
    this.successMessageSubject.next(message);
  }

  showErrorMessage(fields: string[]) {
    const message = fields.map(
      (field) => field[0].toUpperCase() + field.slice(1)
    );

    this.errorMessageSubject.next('Error: ' + message);
  }

  validate(fields: any) {
    const error = [];
    for (const key in fields) {
      if (fields[key] == '' || fields[key] == null) {
        error.push(key);
      }
    }

    return error;
  }
}
