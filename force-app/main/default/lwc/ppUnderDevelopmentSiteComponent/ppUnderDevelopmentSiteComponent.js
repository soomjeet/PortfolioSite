import { api, LightningElement } from "lwc";

export default class PpUnderDevelopmentSiteComponent extends LightningElement {
  @api hideBanner;

  get isBannerDisplayed() {
    return this.hideBanner && this.hideBanner === false ? true : false;
  }
}
