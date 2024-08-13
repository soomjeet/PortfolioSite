import { LightningElement, api } from 'lwc';

export default class PpSkillProgressBarComponent extends LightningElement {
    _progressBarPillData = {
        skillName: "Test",
        skillRating: "3.5"
    }

    @api
    get progressBarPillData() {
        return this._progressBarPillData;
    }
    set progressBarPillData(value) {
        console.log('_progressBarPillData : ',JSON.stringify(value));
        this._progressBarPillData = value;
    }

    get skillRatingValue() {
        let skillRatingBarWidth = this._progressBarPillData?.skillRating ? this._progressBarPillData?.skillRating * 10 : 0;
        return skillRatingBarWidth;
    }
}