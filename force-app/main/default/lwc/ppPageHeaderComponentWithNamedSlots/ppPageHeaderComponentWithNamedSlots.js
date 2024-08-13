import { LightningElement,api } from 'lwc';

export default class PpPageHeaderComponentWithNamedSlots extends LightningElement {
    @api
    get containerId() {
        return this._containerId;
    }
    set containerId(value) {
        this._containerId = value;
    }

    handleContainerClicked(event){
        let currentContainerId = event.currentTarget.dataset.id;
        this.dispatchEvent(new CustomEvent('headerPageOnClickEvent', {
            Id : currentContainerId
        }));
    }
}