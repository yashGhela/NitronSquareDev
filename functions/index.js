

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./nstudy-dev-firebase-adminsdk-btkt7-dbec87a2c2.json');
const bent = require('bent');

admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nstudy-dev-default-rtdb.firebaseio.com',
  },
);


exports.cancelPaypalSubscription = functions.https.onCall(async (id, res) => {
  const post = bent(
    'https://api.sandbox.paypal.com/v1/billing/subscriptions/' + id,
    'POST',
    {
     'Content-Type': 'application/json',
    });
  return await post('/cancel', {reason: 'User downgraded'});
});


