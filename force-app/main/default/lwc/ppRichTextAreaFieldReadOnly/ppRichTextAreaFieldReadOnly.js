/* eslint-disable @lwc/lwc/no-inner-html */
import { LightningElement, api } from "lwc";

export default class PpRichTextAreaFieldReadOnly extends LightningElement {
  _htmlTextAreaContent = "<h1>TEXT</h1><br/><h3>This is Testing txt</h3>";

  @api
  get htmlTextAreaContent() {
    return this._htmlTextAreaContent;
  }
  set htmlTextAreaContent(value) {
    this._htmlTextAreaContent = value;
  }

  renderedCallback() {
    const richTextBox = this.template.querySelector(".richTxtBox");
    richTextBox.innerHTML = this._htmlTextAreaContent;
  }
}
