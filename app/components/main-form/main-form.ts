import { Component } from 'angular2/core';
import { FormModel } from './form-model';
import { ControlGroup, Validators, FormBuilder, Control } from 'angular2/common';
import { MainFormService } from '../../services/main-form-service'; //название дерьмо, надо поменять, так как это скорее конструктор новостей
import Constants from '../../utils/constants';
import DB from '../../services/DB';

@Component({
    templateUrl: './app/components/main-form/main-form.html',
    selector: 'main-form'
})

export class MainForm {
    maxLength = Constants.NEWS_PARTS_MAX_LENGTH;
    article;
    index: number = 1;
    constructor() {
        this.article = new MainFormService();
    }
    linksChecker(c: Control) {
        var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        if (!regex.test(c.value)) {
            return {
                link: true
            }
        }
        return null
    }
    fb = new FormBuilder()
    validationObj = {
        //как мне получить здесь доступ к главному this. через call или apply как-то?
        'articleLink': ['http://www.typescriptlang.org/', this.linksChecker],
        'imageLink0': ['http://www.typescriptlang.org/', this.linksChecker],
        'coverLink': ['http://www.typescriptlang.org/', this.linksChecker],
        'articleSource': ['http://www.typescriptlang.org/', this.linksChecker]

    }
    form = this.fb.group(this.validationObj);
    addOncePart() {
        this.index++;
        this.article.addOncePart(this.index);
        this.validationObj['imageLink' + (this.index-1)] = [this.article.parts[this.index-1].image, this.linksChecker];
        this.form = this.fb.group(this.validationObj);
    }
    sdfg() {
        console.log(this.form)
    }

    onSubmit(e) {
        e.preventDefault();
        // DB.addMessage(this.article).then(() => {
        //    alert('Article added')
        // }, () => {
        //    alert('Article failed')
        // });
    }

}
