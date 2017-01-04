'use strict';

let EC = protractor.ExpectedConditions;
let viewMoreBundlesCounter = 0;

class BundlesPage {
    constructor() {
        this.currentBundles = $('package-row');

        this.bundleOptionsRepeater = element(by.repeater('rows in bundles.packagesToShow'));
        this.packageName = $('.package-row-indent');
        this.packagePrice = $('.priceOuter');
        this.packagePriceBody = this.packagePrice.$('.priceBody');
        this.packagePriceCents = this.packagePrice.$('.priceCentsEtc');

        this.viewMoreOptions = $('[ng-click="onViewMoreOptions()"]');
        this.bundleOptionsRepeaterAll = element.all(by.repeater('rows in bundles.packagesToShow'));
        this.bundleOptionsProducts = element.all(by.repeater('product in rows'));
    }

    verifyFirstbundle() {
        this.packageName.getText().then((text) => {
            console.log('Name of the Package : ' + text);
            this.packagePriceBody.getText().then((priceBody) => {
                this.packagePriceCents.getText().then((priceCents) => {
                    console.log('Price of the package is : ' + priceBody + '.' + priceCents);
                })
            });
        });
    }

    test() {
        this.bundleOptionsRepeaterAll.get(0).getText().then((text) => {
            console.log('made it 100 :: ' + text);
        })
    }

    viewMoreBundles() {
        viewMoreBundlesCounter++;
        expect(this.viewMoreOptions.isDisplayed()).toBeTruthy();
        this.viewMoreOptions.click();
    }

    addBundleToCart(bundleName) {
        browser.wait(EC.visibilityOf(this.bundleOptionsRepeater), 30000, ' \'bundleOptionsRepeater\' Element not visible').then(() => {
            let filteredBundles = this.bundleOptionsProducts.filter((item) => {
                return item.element(by.tagName('h3')).getText().then((bundle) => {
                    console.log('Bundle Name : ' + bundle);
                    return bundle === bundleName;
                });
            }).first().element(by.buttonText('Upgrade')).click().then(() => {
            });
        });
    }

    findBundle() {
        element.all(by.repeater('rows in bundles.packagesToShow')).filter((item) => {
            item.getText().then((text) => {
                console.log('text is :: ' + text);
            });
        });
    }
}
module.exports = BundlesPage;