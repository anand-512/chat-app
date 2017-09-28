// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '280414779117041', // your App ID
        'clientSecret'  : '1b34729296f4d58c12adf01b672d732d', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileFields'   : ['id', 'emails', 'name'],
    },

    'twitterAuth' : {
        'consumerKey'       : 'tbeAo7uAmnWORVbIzee7py1m2',
        'consumerSecret'    : '3I4Q4mLM6oeDNei07ckZgb9ZbwsGiI4TY71y3i8XTqlKNtTUUE',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '514342500185-o90fupt1r52cm8c3jmvk3ectuk2vnri7.apps.googleusercontent.com',
        'clientSecret'  : 'NWbvs2a1LGCx98KEvoWfmo4V',
        'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'
    }

};
