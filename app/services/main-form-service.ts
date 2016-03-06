import { Injectable } from 'angular2/core';
import { FormModel } from '../components/main-form/form-model';

@Injectable()
export class MainFormService {
    public formArray: [FormModel] = [new FormModel()];

    public addOncePart(onePart: FormModel) {
        this.formArray.push(onePart);
    }
}
