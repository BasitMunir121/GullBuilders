import { FormGroup, AbstractControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/authservice';
import { BaseClass } from './base-class';

export class BaseForm extends BaseClass {
    public myFormGroup: FormGroup;

    constructor(auth: AuthService) {
        super(auth);
    }

    // helpers for View
    isControlValid(controlName: string): boolean {
        var requiredIfErrors: string = this.myFormGroup.getError('requiredIf');
        const control = this.getControlByName(controlName);
        return !requiredIfErrors?.includes(controlName) && control.valid && control.dirty;
    }

    isControlInvalid(controlName: string): boolean {
        var requiredIfErrors: string = this.myFormGroup.getError('requiredIf');
        const control = this.getControlByName(controlName);
        return (requiredIfErrors?.includes(controlName) || control.invalid) && control.dirty;
    }

    controlHasError(validation: any, controlName: any): boolean {
        const control = this.getControlByName(controlName);
        if (!control)
            return true;
        return control.hasError(validation) && control.dirty;
    }

    isControlTouched(controlName: any): boolean {
        const control = this.getControlByName(controlName);
        return control.dirty || control.touched;
    }

    formHasError(validation: string, controlName: string): boolean {
        var errorControls: string = this.myFormGroup.getError(validation);
        var control = this.getControlByName(controlName);
        return (errorControls?.includes(controlName) && control.dirty) ?? false;
    }

    public getControlByName(controlName: any): AbstractControl {
        return this.myFormGroup?.controls[controlName];
    }

    public requiredIfValidations(conditions: [{ dependentProperty: string, operator: HOperator, dependentValue: any, require: string }], formGroup: FormGroup) {
        var requiredIfValidations: string = '';

        conditions.forEach(condition => {
            switch (condition.operator) {
                case HOperator.EqualTo:
                    if (formGroup.value[condition.dependentProperty] == condition.dependentValue) {
                        requiredIfValidations += Validators.required(formGroup.get(condition.require)!) ?
                            condition.require + ',' : '';
                    }
                    break;
                case HOperator.NotEqualTo:
                    if (formGroup.value[condition.dependentProperty] != condition.dependentValue) {
                        requiredIfValidations += Validators.required(formGroup.get(condition.require)!) ?
                            condition.require + ',' : '';
                    }
                    break;
                case HOperator.GreaterThan:
                    if (formGroup.value[condition.dependentProperty] > condition.dependentValue) {
                        requiredIfValidations += Validators.required(formGroup.get(condition.require)!) ?
                            condition.require + ',' : '';
                    }
                    break;
                case HOperator.GreaterThanOrEqualTo:
                    if (formGroup.value[condition.dependentProperty] >= condition.dependentValue) {
                        requiredIfValidations += Validators.required(formGroup.get(condition.require)!) ?
                            condition.require + ',' : '';
                    }
                    break;
                case HOperator.LessThan:
                    if (formGroup.value[condition.dependentProperty] < condition.dependentValue) {
                        requiredIfValidations += Validators.required(formGroup.get(condition.require)!) ?
                            condition.require + ',' : '';
                    }
                    break;
                case HOperator.LessThanOrEqualTo:
                    if (formGroup.value[condition.dependentProperty] <= condition.dependentValue) {
                        requiredIfValidations += Validators.required(formGroup.get(condition.require)!) ?
                            condition.require + ',' : '';
                    }
                    break;
            }
        });

        return requiredIfValidations ? { requiredIf: requiredIfValidations } : null;
    }
}

export enum HOperator {
    EqualTo, NotEqualTo, GreaterThan, GreaterThanOrEqualTo, LessThan, LessThanOrEqualTo
}