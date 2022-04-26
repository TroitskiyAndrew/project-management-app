import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class ValidationService {

  public static isValidPassword(control: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};
    if (control.value.length < 8) {
      errors['length'] = 'at least 8 characters';
    }
    if (!control.value.match(/[a-z]/) || !control.value.match(/[A-Z]/)) {
      errors['case'] = 'a mixture of both uppercase and lowercase letters';
    }
    if (!control.value.match(/[!@#$%^&*]/)) {
      errors['symbols'] = 'inclusion of at least one special character: !@#$%^&*';
    }
    return Object.keys(errors).length > 0 ? errors : null;
  }

}
