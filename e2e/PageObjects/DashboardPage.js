'use strict';

let EC = protractor.ExpectedConditions;

class DashboardPage {
    constructor() {
        // this.UpgradeBundle = element(by.buttonText('UPGRADE YOUR BUNDLE'));
        this.UpgradeBundle = $('.t-btn-reg'); //ToDo: why the above locator is not wowrking (element is not clickable)
        this.FrontierSecure = element(by.buttonText('SHOP FRONTIER SECURE'));
        this.navArrowBar = $('.fecomm-arrow-active');
    }

    verifyURL() {
        return browser.getCurrentUrl().then((text) => {
            console.log('URL : ' + text);
            expect(browser.getCurrentUrl()).toEqual('https://frontierec-qa.agreeyamobility.ca/#/dashboard');
        });
    }
    upgradingBundle() {
        return browser.wait(EC.elementToBeClickable(this.UpgradeBundle), 10000, 'Element not clickable').then(() => {
            this.UpgradeBundle.click().then(() => {
                // browser.pause();
            });            
        });
    }
    shopFrontierSecure() {
        return browser.wait(EC.elementToBeClickable(this.FrontierSecure), 4000, 'Element not clickable').then(() => {
            this.FrontierSecure.click();
        });
    }
    verifyNavArrow(selectedNav) {
        expect(this.navArrowBar.isPresent()).toBe(true);
        this.navArrowBar.getText((navtext) => {
            console.log('Nav Arrow - Actual: '+ navtext + ' - Expected: ' + selectedNav);
            expect(navtext).toEqual(selectedNav);
        })
    }
}
module.exports = DashboardPage;