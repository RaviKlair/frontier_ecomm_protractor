'use strict';

let EC = protractor.ExpectedConditions;

class CustomizePage {
    constructor() {
        this.categoriesContent = element(by.id('categoryContent0-0'));
        this.categoryFeatureList = element(by.repeater('feature in category.features'));
        this.categoryFeatures = element.all(by.repeater('feature in category.features'));
    }

    addCustomizationToCart(featureNames) {
        browser.wait(EC.visibilityOf(this.categoryFeatureList), 30000, ' \'categoriesContent\' Element not visible').then(() => {
            featureNames.forEach((featureName) => {
                let filteredFeatures = this.categoryFeatures.filter((item) => {
                    return item.element(by.tagName('h4')).getText().then((feature) => {
                        // console.log('Feature Name : ' + feature);
                        return feature === featureName;
                    });
                }).first().element(by.buttonText('Add to Cart')).click().then(() => {
                    console.log('Current seleted feature : ' + featureName);
                });    
            });
        });
    }
}
module.exports = CustomizePage;