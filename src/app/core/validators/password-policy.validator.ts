import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordPolicyValidator(
  control: AbstractControl
): ValidationErrors | null {

  const value: string = control.value || '';

  const rules = {
    minLength: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    noSpace: !/\s/.test(value),
  };

  const isValid = Object.values(rules).every(Boolean);

  return isValid ? null : { passwordPolicy: rules };
}
