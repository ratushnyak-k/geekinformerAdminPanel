export class FormModel {
    part: number;
    question: string;
    image: string;
    text: string;
    constructor(part) {
        this.part = part;
        this.question = '';
        this.image = '';
        this.text = '';
    }
}
