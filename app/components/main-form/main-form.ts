import { Component, Injectable } from 'angular2/core';
import { ControlGroup, Validators, FormBuilder, Control, FORM_DIRECTIVES } from 'angular2/common';

import Constants from '../../utils/constants';
import DB from '../../services/DB';

@Component({
    templateUrl: './app/components/main-form/main-form.html',
    selector: 'main-form',
    directives: [FORM_DIRECTIVES]
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
    linksChecker;
    index: number = 1;
    validateService = new LinksCheckerService();
    constructor(private builder: FormBuilder) {
        this.linksChecker = this.validateService.linksChecker;
        this._builder = builder;

        this.title = new Control('', Validators.required);
        this.link = new Control('', Validators.compose([Validators.required, this.linksChecker]));
        this.cover = new Control('', Validators.compose([Validators.required, this.linksChecker]));
        this.source = new Control('', Validators.compose([Validators.required, this.linksChecker]));
        this.parts = new FormModel(1, this._builder).form;

        this.form = builder.group({
            title: this.title,
            link: this.link,
            cover: this.cover,
            source: this.source,
            parts: [
                [this.parts]
            ]
        });
    }
    addOncePart() {
        this.index++;
        this.form.value.parts.push(new FormModel(this.index, this._builder).form);
    }

    onSubmit(e) {
        e.preventDefault();
        var form = this.form.value;
        var parts = [];

        for (var i = 0; i < form.parts.length; ++i) {
            var part = form.parts[i].value;

            parts = [...parts, new ProcessedSecondaryPart(part.part, part.question, part.image, part.text)];
        }

        var readyForSend = new ProcessedMainPart(form.title, form.link, form.cover, form.source, parts);
        console.log(readyForSend);
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

export class FormModel {
    part: Control;
    question: Control;
    image: Control;
    text: Control;

    form: ControlGroup;
    linksChecker;
    validateService = new LinksCheckerService();
    constructor(part, private builder: FormBuilder) {
        this.linksChecker = this.validateService.linksChecker;

        this.part = new Control(part);
        this.question = new Control('', Validators.required);
        this.image = new Control('', Validators.compose([Validators.required, this.linksChecker]));
        this.text = new Control('', Validators.required);

        this.form = builder.group({
            part: this.part,
            question: this.question,
            image: this.image,
            text: this.text
        });
    }
    getForm() {
        return this.form;
    }
}
@Injectable();
export class LinksCheckerService {
    linksChecker(c: Control) {
        var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        if (!regex.test(c.value)) {
            return {
                link: true
            };
        }
        return null;
    }
}

export class ProcessedMainPart {
    title: string;
    link: string;
    cover: string;
    source: string;
    parts: any;
    constructor(title, link, cover, source, parts) {
        this.title = title;
        this.link = link;
        this.cover = cover;
        this.source = source;
        this.parts = parts;
    }
}

export class ProcessedSecondaryPart {
    part: string;
    question: string;
    image: string;
    text: string;
    constructor(part, question, image, text) {
        this.part = part;
        this.question = question;
        this.image = image;
        this.text = text;
    }
}
