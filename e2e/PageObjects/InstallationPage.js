'use strict';

let EC = protractor.ExpectedConditions;

class InstallationPage {
    constructor() {
        this.aptTime = element.all(by.repeater('block in calendarBlocks'));
    }
    
    chooseAptTime() {
        this.aptTime.getText().then((text) => {
            console.log('all the text :: ' + text);
        });
        let selectedTime = this.aptTime.filter((item, index) => {
            return item.getText().then((text1) => {
                console.log('filter result ::::::: ' + text1)
                return text1 === '20th Dec';
            });
        });
        selectedTime.getText().then((time) => {
            console.log('selected time is :: ' + time);
        })
    }
}
module.exports = InstallationPage;