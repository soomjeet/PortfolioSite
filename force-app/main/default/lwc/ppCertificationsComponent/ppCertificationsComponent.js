import { LightningElement, api } from "lwc";

export default class PpCertificationsComponent extends LightningElement {
  _certificationRecords;
  _certificationRecordsSize = 0;
  @api
  get certificationRecords() {
    return this._certificationRecords;
  }
  set certificationRecords(value) {
    try {
      this._certificationRecords = value;
      this._certificationRecordsSize = this._certificationRecords
        ? Object.keys(this._certificationRecords).length
        : 0;
    } catch (error) {
      console.log(error.stack);
    }
  }
}
