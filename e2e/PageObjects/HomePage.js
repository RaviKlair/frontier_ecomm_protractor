'use strict';

let EC = protractor.ExpectedConditions;

class HomePage {
    constructor() {
        // this.navBar = $('.nav.navbar-nav');
        this.navBarLeft = element.all(by.css('.nav.navbar-nav')).first();
        this.DashboardLink = element(by.linkText('Dashboard'));
        // this.TestPagesLink = element(by.linkText('Test Page '));
        this.TestPagesLink = this.navBarLeft.$('.dropdown'); //ToDo : why the above locator is nopt working (Error: element not clickable)
        // this.TestPagesDropDown = $('.dropdown.open').$('.dropdown-menu');

        //also
        this.TestPagesDropDown = this.navBarLeft.$('li.dropdown ul.dropdown-menu');
    }

    verifyURL() {
        return browser.getCurrentUrl().then((text) => {
            console.log('URL : ' + text);
            expect(browser.getCurrentUrl()).toEqual('https://frontierec-qa.agreeyamobility.ca/#/');
        });
    }

    browseToDashboard() {
        browser.wait(EC.elementToBeClickable(this.DashboardLink), 3000, 'Element not clickable').then(() => {
            this.DashboardLink.click();
        });
    }

    browseTestPages(item) {
        browser.wait(EC.elementToBeClickable(this.TestPagesLink), 3000, 'Element not clickable').then(() => {
            this.TestPagesLink.click().then(() => {
                expect(this.TestPagesDropDown.isDisplayed()).toBeTruthy();
                this.TestPagesDropDown.element(by.cssContainingText('li', item)).click();
                // browser.pause();
            });
        });
    }
}
module.exports = HomePage;