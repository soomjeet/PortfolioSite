/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import { LightningElement, track, api } from "lwc";
import FORM_FACTOR from "@salesforce/client/formFactor";
import DESKTOPTEMPLATE from "./ppageComponentDesktop.html";
import MOBILETEMPLATE from "./ppageComponentMobile.html";
import SUMMARY_LABEL from "@salesforce/label/c.pp_Summary_Section_Label";
import PORTFOLIO_PORTAL_RESOURCES from "@salesforce/resourceUrl/pp_Assets";
import getPortfolioData from "@salesforce/apex/PortfolioProfileController.getPortfolioData";

const SUMMARY_SECTION_NAME = "summary_section";
const EXPERIENCE_SECTION_NAME = "experience_section";
const SKILLS_SECTION_NAME = "skills_section";
const NO_IMAGE_ICON = "No_Image_Icon";
const MONTH_ARRAY = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
export default class PpageComponent extends LightningElement {
  _isMobileScreen = false;
  @track experiences;
  @track certifications;
  @track skills;
  activeSections = [
    SUMMARY_SECTION_NAME,
    EXPERIENCE_SECTION_NAME,
    SKILLS_SECTION_NAME
  ];
  label = {
    SUMMARY_LABEL
  };

  @api backgroundColor;
  @api textColor;

  connectedCallback() {
    this.buildProfileData();
  }

  async buildProfileData() {
    try {
      let profileResults = await getPortfolioData();
      let moddedResultObj = JSON.parse(JSON.stringify(profileResults));
      moddedResultObj?.experiences?.forEach((elem) => {
        let imgAssetPath = elem.iconName ? elem.iconName : NO_IMAGE_ICON;
        let formattedStartDate = this._formatDate(elem?.startDate);
        let formattedEndDate = elem.isCurrentOrg
          ? "Present"
          : this._formatDate(elem?.endDate);
        elem.formattedExpRange = formattedStartDate + " - " + formattedEndDate;
        elem.displayImagePath =
          PORTFOLIO_PORTAL_RESOURCES +
          "/ppAssets/Images/" +
          imgAssetPath +
          ".jpg";
      });
      this.experiences = moddedResultObj?.experiences;

      moddedResultObj?.certifications.forEach((elem) => {
        let imgAssetPath = elem.iconName ? elem.iconName : NO_IMAGE_ICON;
        elem.displayImagePath =
          PORTFOLIO_PORTAL_RESOURCES +
          "/ppAssets/Images/" +
          imgAssetPath +
          ".jpg";
      });
      this.certifications = moddedResultObj?.certifications;

      this.skills = moddedResultObj?.skills;
      console.log("Result After", JSON.stringify(moddedResultObj));
    } catch (error) {
      console.error("Error:", error);
    }
  }

  render() {
    this._isMobileScreen = FORM_FACTOR === "Small";
    return this._isMobileScreen ? MOBILETEMPLATE : DESKTOPTEMPLATE;
    // return DESKTOPTEMPLATE;
  }

  _formatDate(dt) {
    if (!dt) return;
    let dtVar = new Date(dt);
    if (isNaN(dtVar.getTime())) {
      return dt;
    } else {
      let day = dtVar.getDate();
      day = day < 10 ? "0" + day : day;
      return (
        day + "'" + MONTH_ARRAY[dtVar.getMonth()] + " " + dtVar.getFullYear()
      );
    }
  }
}
