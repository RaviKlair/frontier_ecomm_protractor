(function () {
    'use strict';

    let capabilities = {
        name: 'Chrome-Stable',
        browserName: 'chrome',
        logName: 'Chrome-Stable',
        shardTestFiles: true,
        maxInstances: 3,
        chromeOptions: {
            args: [
                ' --start-maximized',
                ' --disable-login-animations',
                ' --wm-window-animations-disabled'
            ]
        }
    };
    exports.config = {
        // rootElement: '[ng-app="exampleApp"]',
        directConnect: true,
        chromeDriver: null,
        specs: [
            './e2e/Specs/*_spec.js'
        ],
        baseUrl: 'https://frontierec-qa.agreeyamobility.ca/#/',
        // baseUrl: 'https://qat04.frontier.com/',

        onPrepare: () => {
            browser.driver.manage().window().maximize();
            console.log('Jasmine version : ' + jasmine.version);
            browser.driver.get(browser.baseUrl);
        },
        // useAllAngular2AppRoots: true,
        framework: 'jasmine2',
        jasmineNodeOpts: {
            defaultTimeoutInterval: 60 * 1000
        },

        allScriptsTimeout: 30 * 1000,

        getPageTimeout: 10 * 1000
    };
} ());
