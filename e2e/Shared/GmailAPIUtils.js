let fs = require('fs');
let gapi = require('googleapis');
let protractor = require('protractor');

class GmailAPIUtils {

    // let gmail = this.getGmailService();
    // userId = 'e2e@medeo.ca';
    // userId = 'ravitej.klair@mobiliya.com';
    // maxEmailRetryAttempts = 10;

    // This file was downloaded from the Google API Manager: `https://console.developers.google.com/`
    // under the 'Credentials' section
    // and renamed it to `client-secret-e2e.json`
    // clientSecretPath = './e2e/Shared/Gmail/client_secret.json';
    // tokenPath: string = './test/e2e/utils/gmail-auth/oauth2-e2e.json';

    constructor() {
        this.clientSecretPath = './e2e/Shared/Gmail/client_secret.json';
        // this.gmail = this.getGmailService();
    }

    listMessages(userId, query, callback) {
      var getPageOfMessages = function(request, result) {
         request.execute(function(resp) {
             result = result.concat(resp.messages);
             var nextPageToken = resp.nextPageToken;
             if (nextPageToken) {
                  request = gapi.client.gmail.users.messages.list({
                      'userId': userId,
                      // 'pageToken': nextPageToken,
                      'q': query
                  });
                  getPageOfMessages(request, result);
              } else {
                  callback(result);
              }
          });
      };
      // var initialRequest = gapi.client.gmail.users.messages.list({
      //   'userId': userId,
      //   'q': query
      // });
      // getPageOfMessages(initialRequest, []);
  }

    searchMessages(gmailSearchQuery) {
      // Built in retries until:
      // - Success:
      //   An email has been received for the given serach query
      // - Error:
      //  An error is returned by the gmail API, or
      //  Max retries have been tried, or
      //  A Jasmine spec timeout

      let deferred = protractor.promise.defer();
      // let attempts = 0;

      // let listMessages = (listParams) => {

      //   attempts++;

      //   this.gmail.users.messages.list(listParams, (err, response) => {
      //     if (err) {
      //       deferred.reject(err);
      //     }
      //     if (10 === attempts) {
      //       deferred.reject(`${listParams.q} ${attempts} retries ...`);
      //     }
      //     if (response.resultSizeEstimate) {
      //       deferred.fulfill(response);
      //     } else {

      //       // Exponential backoff/decay before next retry
      //       let backoffMsecs = Math.round((Math.pow(2, attempts) + Math.random()) * 1000);
      //       console.log(`retry ${attempts} in: ${backoffMsecs} msecs ${listParams.q}`);

      //       // Recursive, non-blocking retry
      //       setTimeout(() => {
      //         listMessages(listParams);
      //       }, backoffMsecs);
      //     }
      //   });
      // };

      return protractor.promise.controlFlow().execute(() => {

        this.listMessages({
          userId: 'klairravitej@gmail.com',
          fields: 'messages(id),resultSizeEstimate',
          q: gmailSearchQuery
        });
        return deferred.promise;

      });
    }

    // getMessage(messageId) {

    //   return protractor.promise.controlFlow().execute(() => {

    //     let deferred = protractor.promise.defer();
    //     let promise = deferred.promise;

    //     this.gmail.users.messages.get({
    //       userId: this.userId,
    //       id: messageId,
    //       format: 'full',
    //       fields: 'id,payload'
    //     }, (err, response) => {
    //       if (err) {
    //         deferred.reject(err);
    //       } else {
    //         deferred.fulfill(response);
    //       }
    //     });
    //     return promise;
    //   });
    // }

    // getMessageBody(messageId) {

    //   return protractor.promise.controlFlow().execute(() => {

    //     let deferred = protractor.promise.defer();
    //     let promise = deferred.promise;

    //     let part;
    //     this.getMessage(messageId).then((parsedMessage) => {

    //       // console.log(JSON.stringify(parsedMessage.payload, null, 1));

    //       if (parsedMessage.payload && parsedMessage.payload.parts) {
    //         // Most emails contain two parts, content in plain text and html
    //         part = parsedMessage.payload.parts[0];
    //         expect(part.mimeType).toBe('text/plain');
    //       } else {
    //         // Some don't contain any parts
    //         part = parsedMessage.payload;
    //         expect(part.mimeType).toBe('text/html');
    //       }

    //       let emailBody = new Buffer(part.body.data, 'base64').toString('utf8');

    //       deferred.fulfill(emailBody);

    //     }, (err) => {
    //       deferred.reject(err);
    //     });
    //     return promise;
    //   });
    // }

    // trashMessage(messageId) {

    //   return protractor.promise.controlFlow().execute(() => {

    //     let deferred = protractor.promise.defer();
    //     let promise = deferred.promise;

    //     this.gmail.users.messages.trash({
    //       userId: this.userId,
    //       id: messageId
    //     }, (err, response) => {
    //       if (err) {
    //         deferred.reject(err);
    //       } else {
    //         deferred.fulfill(response);
    //       }
    //     });
    //     return promise;
    //   });
    // }

    // getGmailService() {

    //     // Originally downloaded from `https://code.google.com/apis/console`
    //     let clientSecrets = fs.readFileSync(this.clientSecretPath);
    //     // let tokens = fs.readFileSync(this.tokenPath);

    //     // `https://code.google.com/apis/console`
    //     // using the e2e@medeo.ca gmail account
    //     let credentials = JSON.parse(clientSecrets);
    //     let clientSecret = credentials.installed.client_secret;
    //     let clientId = credentials.installed.client_id;
    //     let redirectUrl = credentials.installed.redirect_uris[0];
    //     let oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

    //     // https://www.npmjs.com/package/googleapis#create-a-service-client
    //     // This OAuth2 client 'allows you to retrieve an access token and refreshes the token and
    //     // retry the request seamlessly if you also provide an expiry_date and the token is expired'
    //     oauth2Client.credentials = JSON.parse(tokens);

    //     // Set the OAuth2 client at the gmail service-level
    //     return google.gmail({ version: 'v1', auth: oauth2Client });
    // }

}

let gmailInstance;
if (undefined === gmailInstance) {
  gmailInstance = new GmailAPIUtils();
} else {
  console.error('--- GmailAPIUtils module instantiated > 1x ---');
}
module.exports = gmailInstance;
