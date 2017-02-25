// import { Directive } from '@angular/core';
//
// @Directive({
//   selector: '[appValidateFile]'
// })
// export class ValidateFileDirective {
//
//   constructor() { }
//
// }




// import { Directive, forwardRef, Attribute } from '@angular/core';
// import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
// @Directive({
//   selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
//   providers: [
//     { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
//   ]
// })
// export class EqualValidator implements Validator {
//   constructor( @Attribute('validateEqual') public validateEqual: string) {}
//
//   validate(c: AbstractControl): { [key: string]: any } {
//     debugger;
//     // self value (e.g. retype password)
//     let v = c.value;
//
//     // control value (e.g. password)
//     let e = c.root.get(this.validateEqual);
//
//     // value not equal
//     if (e && v !== e.value) return {
//       validateEqual: false
//     }
//     return null;
//   }
// }











import { Directive, forwardRef, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator} from '@angular/forms';


@Directive({
    selector: '[ValidateFileDirective][ngControl],[ValidateFileDirective][ngFormControl],[ValidateFileDirective][ngModel]',

  providers: [
    { provide: NG_VALIDATORS,  useExisting: forwardRef(() => ValidateFileDirective), multi: true }
  ]
})

export class ValidateFileDirective implements Validator{
  public validate(control: any) : { required: { [key: string]: boolean } | null } {
    debugger;
    let state,
      value = control.value,
      alreadyUsed = control.dirty;

    if(alreadyUsed && value.length == 0){
      state = true;
    }
   // return state ? { required : { 'required' : false } } : null
    return null
  }

  registerOnValidatorChange(fn: () => void) : void{
    debugger
  }

  ngOnChanges(changes: SimpleChanges) : void{
    debugger
  }
}




// import { Directive } from '@angular/core';
// import { NG_VALIDATORS } from '@angular/forms';
//
// @Directive({
//   selector: '[validateEmail][ngModel]',
//   providers: [
//     { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
//   ]
// })
// class EmailValidator {}
