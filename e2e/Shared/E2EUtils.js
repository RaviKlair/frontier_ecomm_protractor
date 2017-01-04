'use strict';

let EC = protractor.ExpectedConditions;

class E2EUtils {
    constructor() {
        
    }

    verifyURL(pageName) {
        return browser.getCurrentUrl().then((urlText) => {
            console.log('URL : ' + urlText);
            expect(browser.getCurrentUrl()).toEqual('https://frontierec-qa.agreeyamobility.ca/#/' + pageName);
        });
    }

    verifyCart() {

    }
}
module.exports = E2EUtils;