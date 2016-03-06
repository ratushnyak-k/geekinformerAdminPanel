import { Component } from 'angular2/core';
import { FormModel } from './form-model';
import { MainFormService } from '../../services/main-form-service';

@Component({
    templateUrl: './app/components/main-form/main-form.html',
    selector: 'main',
    providers: [MainFormService]
})

export class MainForm {
    maxLength = 4;
    formArray;
    service;
    index: number = 1;
    constructor(formSevice: MainFormService) {
        this.service = formSevice;
        this.formArray = this.service.formArray;
    }
    addOncePart() {
        this.index++;
        this.service.addOncePart(new FormModel(this.index));
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.formArray);
    }
}
