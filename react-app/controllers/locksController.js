const axios = require('axios');

// Dev access_token that we'll use if getting individual authorization doesn't work
backupAccessToken = '2bb0bfc90e2423181aeaf2200a06b2c7d4b8cc1ef2b10b94fdb4166fe7c160a6';

// Global AXIOS defaults
axios.defaults.baseURL = 'https://api.lockitron.com';           // this is the prefix to all of our axios calls
// these are supposed to set the access_token to the backupAccessToken
// axios@0.19.0 broke it, use "axios": "^0.18.1"
axios.defaults.params = {};                                     // make an empty object
axios.defaults.params['access_token'] = backupAccessToken;      // so I can define specific params


// LOCK
// PUT: this will lock Locks
function lockHouse(req, res) {
        const lockId = `3d5f236f-fee0-4e91-8e43-71f6eb7503a0`;      // 'Project 3 Lockitron' on Lockitron's dashboard
    axios.put(`/v2/locks/${lockId}`, {
        state: 'lock'
    })
        .then(function(res) {
            console.log(`CONFIG SENT:\n**`);
            console.log(res.config)
            console.log(`DATA RECEIVED:\n**`);
            console.log(res.data);

            // pertinent information:
            let currentLock = {
                name: res.data.name,
                lockState: res.data.state,
            };

            // human
            alert(`${currentLock.name} has been ${currentLock.lockState}ed!`);
        })
        .catch(function(err) {
            console.log(err);
        })
        .finally(function(){
            console.log(`***\nLOCK THE HOUSE ✅`);
        });
}

module.exports = lockHouse;