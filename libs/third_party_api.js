let request = require('request');
let helpers = require('./helpers');
let config = require('../config');

let third_party_api = {
    // config: config.opsviewAccount,
    // getToken: async () => {
    //     try {
    //         let url = `https://${third_party_api.config.host}/rest/login`;
    //         let data = {username: third_party_api.config.username, password: third_party_api.config.password};
    //         let response = await helpers.promisify(cb => request.post(url, {strictSSL: false, form: data}, cb));
    //         response = JSON.parse(response.body);
    //         console.log(response);
    //         if (response.token && !response.result) {
    //             third_party_api.config.token = response.token;
    //         }
    //     } catch (e) {
    //         console.log('opsviewApi.getToken', e);
    //     }
    // },
    // getAlerts: async () => {
    //     try {
    //         if (third_party_api.config.token === null) {
    //             await third_party_api.getToken();
    //             return await third_party_api.getAlerts();
    //         }
    //
    //         let url = `https://${third_party_api.config.host}/rest/status/service?hostgroupid=3&filter=unhandled&state=2`;
    //         let headers = {
    //             'x-opsview-username': third_party_api.config.username,
    //             'x-opsview-token': third_party_api.config.token,
    //             'content-type': "application/json",
    //             'cache-control': "no-cache"
    //         };
    //
    //         let response = await helpers.promisify(cb => request.get(url, {
    //             headers: headers,
    //             strictSSL: false
    //         }, cb));
    //
    //         return JSON.parse(response.body);
    //     } catch (e) {
    //         console.log('opsviewApi.getJobInfor', e);
    //         return false;
    //     }
    // },
    // showConfig: async () => {
    //     console.log(third_party_api.config);
    // }
};

(async () => {
    // await third_party_api.getToken();
    // console.log(await opsviewApi.getAlerts());
    // await opsviewApi.showConfig();
})();

module.exports = third_party_api;