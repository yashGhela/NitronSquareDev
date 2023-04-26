

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

const CLIENTID='ATV2Co73t1tlgpv3pR_tKU7RQVo4CO1cpwLj-KQ4XFuVDzi1BfDKpcl83XnVeE1ynQZOYuDnIHcx2fB2';
const SECRET='EFW45r53knvyP18tZY2mFVWhGod9a4YpfM6R4kftC9_WzRHTpkV9FFgHHZDPlfDn3HpIpxpxmMj-DbFp';


exports.cancelPaypalSubscription = functions.https.onCall(async (data, context) => {
  const post = bent(
    'https://api-m.sandbox.paypal.com/v1/billing/subscriptions/' + data.id,
    'POST',
    {'Authorization': 'Basic ' + CLIENTID+':'+SECRET,
     'Content-Type': 'application/json',
    });
  return await post('/cancel', {reason: 'User downgraded'});
});


