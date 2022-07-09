import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let pass = group.get('password')?.value;
  let confirmPass = group.get('checkPassword')?.value;
  return pass === confirmPass ? null : { notSame: true };
};
