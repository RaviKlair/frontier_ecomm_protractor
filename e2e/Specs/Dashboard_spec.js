'use strict';

let HomePage = require('../PageObjects/HomePage');
let DashboardPage = require('../PageObjects/DashboardPage');
let BundlesPage = require('../PageObjects/BundlesPage');
let Cart = require('../PageObjects/Cart');
let CustomizePage = require('../PageObjects/CustomizePage');
let InstallationPage = require('../PageObjects/InstallationPage');
let E2EUtils = require('../Shared/E2EUtils');
let GmailAPIUtils = require('../Shared/GmailAPIUtils');

// Login test on QAT04

// describe('QA - Frontierec', () => {
//     describe('- Flow 1', () => {
//         it('should click on "Dashboard" button ', () => {
//             browser.ignoreSynchronization = true;
//             browser.driver.findElement(by.name('password')).sendKeys('francis');
//             browser.actions().sendKeys(protractor.Key.ENTER).perform();
//             browser.ignoreSynchronization = false;
//             browser.sleep(7000);
//         });

//         it('should click on "Dashboard" button 2 ', () => {
//             element(by.id('signinDropdown')).click().then(() => {
//                 var tableModal = $('.login-modal-table');
//                 var userName = tableModal.$('[placeholder="mary@frontier.com or marysmith"]');
//                 var password = tableModal.element(by.id('fid-login-inline-password'));
//                 console.log('inside wait');
//                 userName.sendKeys('jlqa1@yopmail.com').then(() => {
//                     console.log('username entered');
//                     password.sendKeys('Password123').then(() => {
//                         console.log('Entered password');
//                         element(by.buttonText('Sign In')).click();
//                     });
//                 });
//             });
//         });
//     });
// });


describe('QA - Frontierec', () => {
    describe('- Flow 1', () => {
        it('should click on "Dashboard" button and select a service ', () => {
            browser.ignoreSynchronization = true;
            let homepage = new HomePage();
            homepage.browseToDashboard();
            let dashboardpage = new DashboardPage();
            dashboardpage.upgradingBundle();
        });

        it('should see the test pages menu and select the menu ', () => {
            let homepage = new HomePage();
            homepage.browseTestPages('Bundles');
        });

        xit('should check for an email in the Gmail account ', () => {
            let userID = 'klairravitej@gmail.com'
            let searchQuery = 'in:inbox ' +
            ' from:ravitej.klair@mobiliya.com' +
            ' to:klairravitej@gmail.com'  +
            ' subject:Test message from Mobiliya' +
            ' newer_than:1d';

            GmailAPIUtils.searchMessages(searchQuery);
        });

        it('should select a bundle ', () => {
            let bundlespage = new BundlesPage();
            let e2eutils = new E2EUtils();
            let cart = new Cart();
            let dashboardpage = new DashboardPage();
            dashboardpage.verifyNavArrow('Select');
            e2eutils.verifyURL('bundles');
            bundlespage.addBundleToCart('Vantage Voice 200, Vantage Extreme');
            cart.goToNextStep();
        });

        it('should customize a bundle ', () => {
            let customizepage = new CustomizePage();
            let dashboardpage = new DashboardPage();
            dashboardpage.verifyNavArrow('Customize');
            dashboardpage.upgradingBundle();
            customizepage.addCustomizationToCart(['Frontier Texting - Premium', 'Frontier Texting - Platinum']);
        });

        it('should verify the cart ', () => {
            let bundlespage = new BundlesPage();
            let cart = new Cart();
            cart.expandCart();
            cart.verifyBundleNameAndCharges('Vantage Voice 200, Vantage Extreme', '74.99');
            cart.verifyAddOnsNameAndCharges(['Frontier Texting - Premium' , 'Frontier Texting - Platinum']);
            // cart.goToNextStep();
        });

        xit('should selct an appointment time ', () => {
            let homepage = new HomePage();
            let e2eutils = new E2EUtils();
            let installationpage = new InstallationPage();
            homepage.browseTestPages('Installation');
            e2eutils.verifyURL('installation');
            installationpage.chooseAptTime();
        });
    });
});