import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class ValidationService {

  public static isValidPassword(control: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};
    if (control.value.length < 8) {
      errors['length'] = true;
    }
    if (!control.value.match(/[a-z]/) || !control.value.match(/[A-Z]/)) {
      errors['case'] = true;
    }
    if (!control.value.match(/[!@#$%^&*]/)) {
      errors['symbols'] = true;
    }
    return Object.keys(errors).length > 0 ? errors : null;
  }

  public static isEmptyOrValidPassword(control: AbstractControl): ValidationErrors | null {
    return control.value ?
      ValidationService.isValidPassword(control) :
      null;
  }

  public static isEqualString(str: string): (control: AbstractControl) => ValidationErrors | null {
    return function (control: AbstractControl) {
      return control.value === str ?
        null :
        { 'notEqualString': true };
    };
  }

  public static isNotEqualString(str: string): (control: AbstractControl) => ValidationErrors | null {
    return function (control: AbstractControl) {
      return control.value !== str ?
        null :
        { 'equalString': true };
    };
  }

}
