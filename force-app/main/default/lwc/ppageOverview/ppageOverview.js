import { LightningElement } from "lwc";
import PORTFOLIO_PORTAL_RESOURCES from "@salesforce/resourceUrl/pp_Assets";
import FORM_FACTOR from "@salesforce/client/formFactor";
import DESKTOPTEMPLATE from "./ppageOverviewDesktop.html";
import MOBILETEMPLATE from "./ppageOverviewMobile.html";
import googleFileId from "@salesforce/label/c.pp_GoogleDocResumeFileId";

const DEFAULT_ICON_URI_OBJECT = {
  linkedIn: "/ppAssets/Icons/LinkedIn_Logo_SVG.svg#linkedIn_default",
  medium: "/ppAssets/Icons/Medium_Logo_SVG.svg#medium_default",
  twitter: "/ppAssets/Icons/Twitter_Logo_SVG.svg#twitter_default",
  gmail: "/ppAssets/Icons/Gmail_Logo_SVG.svg#gmail_default",
  github: "/ppAssets/Icons/Github_Logo_SVG.svg#github_default"
};

const HOVER_ICON_URI_OBJECT = {
  linkedIn: "/ppAssets/Icons/LinkedIn_Logo_SVG.svg#linkedIn_hover",
  medium: "/ppAssets/Icons/Medium_Logo_SVG.svg#medium_hover",
  twitter: "/ppAssets/Icons/Twitter_Logo_SVG.svg#twitter_hover",
  gmail: "/ppAssets/Icons/Gmail_Logo_SVG.svg#gmail_hover",
  github: "/ppAssets/Icons/Github_Logo_SVG.svg#github_hover"
};

const SOCIAL_HANDLE_URL = {
  linkedIn: "https://www.linkedin.com/in/soomjeetsahoo",
  medium: "https://soomjeetsahoo.medium.com/",
  twitter: "https://x.com/salesforcesahoo",
  gmail: "mailto:soomjeetsahoo@gmail.com",
  github: "https://github.com/soomjeet"
};

const GOOGLE_URL_PREFIX = "https://docs.google.com/document/d/";
// const DEVELOPER_NAME = "Soomjeet Sahoo";
export default class PpageOverview extends LightningElement {
  isMobile = false;
  isTablet = false;
  isDesktop = false;

  linkedInSVG = PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.linkedIn;
  mediumSVG = PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.medium;
  twitterSVG = PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.twitter;
  gMailSVG = PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.gmail;
  githubSVG = PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.github;

  render() {
    this.isMobile = FORM_FACTOR === "Small";
    // this.isTablet = FORM_FACTOR === "Medium";
    this.isDesktop = FORM_FACTOR === "Large";
    return this.isMobile ? MOBILETEMPLATE : DESKTOPTEMPLATE;
  }
  get profileImageUrl() {
    return PORTFOLIO_PORTAL_RESOURCES + "/ppAssets/Images/Profile_Image.jpeg";
  }

  handleMouseHoverOnIcons(event) {
    let dataKey = event.currentTarget.dataset.key;
    switch (dataKey) {
      case "linkedIn":
        this.linkedInSVG =
          PORTFOLIO_PORTAL_RESOURCES + HOVER_ICON_URI_OBJECT.linkedIn;
        break;
      case "medium":
        this.mediumSVG =
          PORTFOLIO_PORTAL_RESOURCES + HOVER_ICON_URI_OBJECT.medium;
        break;
      case "twitter":
        this.twitterSVG =
          PORTFOLIO_PORTAL_RESOURCES + HOVER_ICON_URI_OBJECT.twitter;
        break;
      case "gmail":
        this.gMailSVG =
          PORTFOLIO_PORTAL_RESOURCES + HOVER_ICON_URI_OBJECT.gmail;
        break;
      case "github":
        this.githubSVG =
          PORTFOLIO_PORTAL_RESOURCES + HOVER_ICON_URI_OBJECT.github;
        break;
      default:
        break;
    }
  }

  handleMouseLeaveOnIcons(event) {
    // console.log("Mouse Left the Icon");
    let dataKey = event.currentTarget.dataset.key;
    switch (dataKey) {
      case "linkedIn":
        this.linkedInSVG =
          PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.linkedIn;
        break;
      case "medium":
        this.mediumSVG =
          PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.medium;
        break;
      case "twitter":
        this.twitterSVG =
          PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.twitter;
        break;
      case "gmail":
        this.gMailSVG =
          PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.gmail;
        break;
      case "github":
        this.githubSVG =
          PORTFOLIO_PORTAL_RESOURCES + DEFAULT_ICON_URI_OBJECT.github;
        break;
      default:
        break;
    }
  }

  handleViewOrDownloadResumeClick(event) {
    let format = event.currentTarget.dataset.format;
    switch (format) {
      case "view":
        this.navigateToGivenURL(this.generateGoogleDocURLBasedOnFormat(format));
        break;
      default:
        this.downloadResumeBasedOnFormat(format);
        break;
    }
  }

  handleButtonIconClick(event) {
    let dataKey = event.currentTarget.dataset.key;
    this.navigateToGivenURL(SOCIAL_HANDLE_URL[dataKey]);
  }

  navigateToGivenURL(url) {
    window.open(url);
  }

  downloadResumeBasedOnFormat(format) {
    window.location.assign(this.generateGoogleDocURLBasedOnFormat(format));
  }

  generateGoogleDocURLBasedOnFormat(format) {
    return format && format === "view"
      ? `${GOOGLE_URL_PREFIX}${googleFileId}/view`
      : `${GOOGLE_URL_PREFIX}${googleFileId}/export?format=${format}`;
  }
}
