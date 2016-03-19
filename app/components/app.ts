import { Component } from 'angular2/core';
import { MainForm } from './main-form/main-form';


@Component({
    selector: 'my-app',
    templateUrl: './app/components/app.html',
    directives: [MainForm]
})
export class AppComponent {}
