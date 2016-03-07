import { Injectable } from 'angular2/core';
import { FormModel } from '../components/main-form/form-model';

export class MainFormService {
    title: string;
    link: string;
    cover: string;
    source: string;
    parts: any;
    constructor() {
        this.title = '';
        this.link = 'http://';
        this.cover = '';
        this.source = '';
        this.parts = [new FormModel(1)];
    }
    public addOncePart(part) {
        this.parts.push(new FormModel(part));
    }
}
