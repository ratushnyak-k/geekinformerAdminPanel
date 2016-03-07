import { Component } from 'angular2/core';
import { FormModel } from './form-model';
import { MainFormService } from '../../services/main-form-service';//название дерьмо, надо поменять, так как это скорее конструктор новостей
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
    addOncePart() {
        this.index++;
        this.article.addOncePart(this.index);
    }
    onSubmit(e) {
        e.preventDefault();
        DB.addMessage(this.article).then(() => {
           alert('Article added')
        }, () => {
           alert('Article failed')
        });
    }
}
