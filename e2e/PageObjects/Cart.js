'use strict';

let EC = protractor.ExpectedConditions;

class Cart {
    constructor() {
        this.cart = $('.container.cart');
        this.expandCartBtn = this.cart.$('.glyphicon-menu-up.cart-arrow');
        this.collapseCart = this.cart.$('.glyphicon-menu-down.cart-arrow');
        this.cartDetails = $('.cart-details-expanded');
        this.cartNextBtn = element(by.buttonText('Next'));

        this.cartBundleRow = element(by.xpath('//html/body/div/div/div/div/fecomm-cart/div[2]/div[2]/div/div[1]'));

        this.addOnRepeater = element.all(by.repeater('addon in fecommStateService.cart.selectedFeatures'));
        // this.addOnFeatures = $('div[id^=cart-addon-]');

        this.itemPrice = $('.priceOuter');
        this.itemPriceBody = this.itemPrice.$('.priceBody');
        this.itemPriceCents = this.itemPrice.$('.priceCentsEtc');

        this.cartNextbtn = element(by.buttonText('Next - Customize'));
    }

    expandCart() {
        expect(this.cart.isDisplayed()).toBeTruthy();
        expect(this.cartDetails.isPresent()).toBe(false, 'because the cart is not expanded');
        this.expandCartBtn.click().then(() => {
            browser.wait(EC.visibilityOf(this.cartDetails), 3000).then(() => {
                console.log('cart is expanded');
                browser.sleep(2000);
                expect(this.cartDetails.isDisplayed()).toBeTruthy();
            });
        });
    }

    collapseCart() {
        expect(this.cartDetails.isDisplayed()).toBeTruthy();
        this.collapseCart.click().then(() => {
            browser.wait(EC.invisibilityOf(this.cartDetails), 3000).then(() => {
                console.log('cart is collapsed');
            });
        });
    }

    verifyBundleNameAndCharges(bundleName, price) {
        expect(this.cartBundleRow.isDisplayed()).toBe(true, 'because bundle should be present');
        this.cartBundleRow.element(by.tagName('h4')).getText().then((bundleText) => {
            console.log('Bundle name in cart is : ' + bundleText);
            expect(bundleText).toEqual(bundleName);
            this.cartBundleRow.$('.priceOuter').getText().then((amountOuter) => {
                this.cartBundleRow.$('.priceBody').getText().then((amountBody) => {
                    this.cartBundleRow.$('.priceCentsEtc').getText().then((amountCents) => {
                        let formattedAmount = amountBody + '.' + amountCents.substring(0, amountCents.indexOf('/'));
                        console.log('formated Amount of the Bundle is: ' + formattedAmount);
                        expect(formattedAmount).toEqual(price);
                    });
                });
            });
        });
    }

    verifyAddOnsNameAndCharges(featureArrayCart) {
        // featureArrayCart.forEach((currentElem) => {
        //     this.addOnRepeater.map((elem) => {
        //         elem.getText().then((arrayText) => {
        //             console.log('current array element : ' + currentElem);
        //             expect(arrayText).toContain(currentElem);
        //         });
        //     });
        // });

        let featuresInCart = this.addOnRepeater.map((elem) => {
            return elem.getText();
        }).then((arrayInCart) => {
            for(let i = 0; i < featureArrayCart.length; i++){
                // console.log('featuresInCart'+ i + ' :::  ' + arrayInCart[i]);
                // console.log('featureArrayCart'+ i + ' :::  ' + featureArrayCart[i]);
                // expect(arrayInCart[i]).toContain(featureArrayCart[i]);
                expect(arrayInCart[i]).toContain(featureArrayCart[i]);
            }
        });

        
        // console.log('current array element : ' + currentElem);
        // expect(featuresInCart).toContain(currentElem);
        


        // .then((arrayText1) => {
        //     console.log('length of the array is ::: ' + arrayText1.length);
        //     console.log('text of the array is ::: \n ' + arrayText1[0]);
        // });



        // expect(this.cartAddOnsRow.isDisplayed()).toBe(true, 'because Add Ons should be present');
        // this.addOnRepeater.count().getText((noOfAddOns) => {
        //     expect(noOfAddOns).toEqual(addOnsName.length);
        // });

        // addOnsName.forEach((featureName) => {
        //     let featureNameCart = this.addOnRepeater.filter((carFeature) => {
        //         return carFeature.element(by.tagName('h4')).getText().then((feature) => {
        //             console.log('Feature Name in cart : ' + feature);
        //             return feature === featureName;
        //         });
        //     }).first().element(by.buttonText('Add to Cart')).click().then(() => {
        //         console.log('Current seleted feature : ' + featureName);
        //     });
        // });


        // this.cartAddOnsRow.element(by.tagName('h4')).getText().then((bundleText) => {
        //     console.log('Bundle name in cart is : ' + bundleText);
        //     expect(bundleText).toEqual(bundleName);
        //     this.cartBundleRow.$('.priceOuter').getText().then((amountOuter) => {
        //         this.cartBundleRow.$('.priceBody').getText().then((amountBody) => {
        //             this.cartBundleRow.$('.priceCentsEtc').getText().then((amountCents) => {
        //                 let formattedAmount = amountBody + '.' + amountCents.substring(0, amountCents.indexOf('/'));
        //                 console.log('formated Amount of the Bundle is: ' + formattedAmount);
        //                 expect(formattedAmount).toEqual(price);
        //             });
        //         });
        //     });
        // });
    }


    goToNextStep() {
        expect(this.cartNextbtn.isDisplayed()).toBe(true, 'because the next button should be displayed');
        this.cartNextbtn.click();
    }

    verifyAddOnsAndCharges() {

    }
}
module.exports = Cart;