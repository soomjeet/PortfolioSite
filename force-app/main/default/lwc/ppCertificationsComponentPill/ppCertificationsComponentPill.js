import { LightningElement,api } from 'lwc';

export default class PpCertificationsComponentPill extends LightningElement {
    
    _element = {
        id : 'testId',
        name : 'testName'
    };
    
    @api
    get element() {
        return this._element;
    }
    set element(value) {
        this._element = value;
    }
}