(function () {
    'use strict';
    let _ = require('lodash');

    let capabilities = {

        stable: {
            name: 'Chrome-Stable',
            browserName: 'chrome',
            logName: 'Chrome-Stable',
            shardTestFiles: true,
            maxInstances: 2,
            // Documentation for chromeOptions at:
            // http://peter.sh/experiments/chromium-command-line-switches/
            chromeOptions: {
                args: [
                    'start-maximized',
                    'disable-accelerated-video-decode'  // Avoid 'HW video decode not available for profile'
                ],
            }
        },

        galaxyNote3: {
            name: 'Chrome-Stable-GalaxyNote3',
            browserName: 'chrome',
            logName: 'Chrome-Stable-GalaxyNote3',
            shardTestFiles: true,
            maxInstances: 2,
            chromeOptions: {
                mobileEmulation: {
                    deviceName: 'Samsung Galaxy Note 3'
                }
            }
        },

        safari: {
            name: 'Safari',
            browserName: 'safari',
            logName: 'Safari',
            shardTestFiles: true,
            maxInstances: 2
        }
    };

    exports.config = {
        capabilities: {
            'name': 'Chrome-Stable-GalaxyNote3',
            'browserName': 'chrome',
            'chromeOptions': {
                'mobileEmulation': {
                    'deviceName': 'Samsung Galaxy Note 3'
                }
            }
        },
        directConnect: true,
        chromeDriver: null,
        specs: [
            './e2e/Specs/*_spec.js'
        ],
        baseUrl: 'https://frontierec-qa.agreeyamobility.ca/#/',

        getMultiCapabilities: function () {
            // Specify capabilities via the command line: e.g.
            // --params.capabilities=canary,stable
            // Defaults to Chrome Stable if not specified
            let multiCapabilities = [capabilities.stable];
            let capabilitiesParam = this.params.capabilities;
            if (capabilitiesParam) {
            multiCapabilities = _(capabilities).pick(capabilitiesParam.split(',')).values().value();
            }
            console.log(JSON.stringify(multiCapabilities, null, 1));
            return multiCapabilities;
        },

        onPrepare: () => {
            console.log('Jasmine version : ' + jasmine.version);
            browser.driver.get(browser.baseUrl);
        },
        framework: 'jasmine2',
        jasmineNodeOpts: {
            defaultTimeoutInterval: 60 * 1000
        },

        allScriptsTimeout: 30 * 1000,

        getPageTimeout: 10 * 1000
    };
} ());
