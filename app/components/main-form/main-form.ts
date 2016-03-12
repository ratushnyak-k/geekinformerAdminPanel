import { Component } from 'angular2/core';
import { ControlGroup, Validators, FormBuilder, Control } from 'angular2/common';

import Constants from '../../utils/constants';
import DB from '../../services/DB';

@Component({
    templateUrl: './app/components/main-form/main-form.html',
    selector: 'main-form'
})

export class MainForm {
    maxLength = Constants.NEWS_PARTS_MAX_LENGTH;

    title: Control;
    link: Control;
    cover: Control;
    source: Control;
    parts: any;

    form: ControlGroup;
    _builder: FormBuilder;

    index: number = 1;
    constructor(private builder: FormBuilder) {
        this._builder = builder;
        this.form = builder.group({
            title: new Control('', Validators.required),
            link: new Control('', Validators.required),
            cover: new Control('', Validators.required),
            source: new Control('', Validators.required),
            parts: [[new FormModel(1, this._builder).form]]
        });
    }
    linksChecker(c: Control) {
        var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        if (!regex.test(c.value)) {
            return {
                link: true
            };
        }
        return null;
    }
    addOncePart() {
        this.index++;
        this.form.value.parts.push(new FormModel(this.index, this._builder).form);
    }

    onSubmit(e) {
        e.preventDefault();
        // DB.addMessage(this.article).then(() => {
        //    alert('Article added')
        // }, () => {
        //    alert('Article failed')
        // });
    }
    test() {
        console.log(this.form);
    }

}

class FormModel {
    part: Control;
    question: Control;
    image: Control;
    text: Control;

    form: ControlGroup;

    constructor(part, private builder: FormBuilder) {
        this.form = builder.group({
            part: new Control(part),
            question: new Control('', Validators.required),
            image: new Control('http://'),
            text: new Control('', Validators.required)
        });
    }
    getForm() {
        return this.form;
    }
}