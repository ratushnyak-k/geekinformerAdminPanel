import { Component } from 'angular2/core';
import { FormModel } from './form-model';


@Component({
    templateUrl: './app/components/main-form/main-form.html',
    selector: 'main'
})

export class MainForm {
    formObj: FormModel = new FormModel();

    onSubmit(e) {
        e.preventDefault();
        console.log(this.formObj);
    }
    getFileValue(value) {
        this.formObj.file = URL.createObjectURL(value);
    }
}
