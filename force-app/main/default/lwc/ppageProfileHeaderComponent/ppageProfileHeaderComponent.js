import { LightningElement } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';
import DESKTOPTEMPLATE from "./ppageProfileHeaderComponentDesktop.html";
import MOBILETEMPLATE from "./ppageProfileHeaderComponentMobile.html";
import PORTFOLIO_PORTAL_RESOURCES from '@salesforce/resourceUrl/pp_Assets';

export default class PpageProfileHeaderComponent extends LightningElement {
    _isMobileScreen = false;
    _profileImage;
    headerTitle = "Soomjeet Sahoo";
    headerContent = "Test Content";
    connectedCallback() {
        // Profile_Image
        this._profileImage = PORTFOLIO_PORTAL_RESOURCES+"/ppAssets/Images/Profile_Image.jpeg"
    }
    render(){
        this._isMobileScreen = FORM_FACTOR === "Small";
        return (this._isMobileScreen) ?  MOBILETEMPLATE : DESKTOPTEMPLATE;
    }
}