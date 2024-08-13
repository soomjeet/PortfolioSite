import { LightningElement,api } from 'lwc';

export default class PpSkillComponent extends LightningElement {
    _skillRecords;

    @api
    get skillRecords() {
        return this._skillRecords;
    }
    set skillRecords(value) {
        console.log('_skillRecords >> '+JSON.stringify(value));
        this._skillRecords = value;
    }
}