import { Component } from 'angular2/core';
import { MainForm } from './main-form/main-form';
import { FormBuilder, ControlGroup, Control, Validators, FORM_DIRECTIVES, CORE_DIRECTIVES, FORM_PROVIDERS } from 'angular2/common';

@Component({
    selector: 'my-app',
    templateUrl: './app/components/app.html',
    directives: [MainForm, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [FORM_PROVIDERS]
})
export class AppComponent { }
