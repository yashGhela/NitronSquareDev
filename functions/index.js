

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./nstudy-dev-firebase-adminsdk-btkt7-dbec87a2c2.json');
const {verifyPaddleWebhook} = require('verify-paddle-webhook');

admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nstudy-dev-default-rtdb.firebaseio.com',
  },
);


const pubKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwh3u6xKJpYrGjAhN57Xb
ThZ7SYoLpHeUi5PBiDxVGeqRTrwwi/K9GT2xtOpxj1dVbKYTs7MTuGFKOu1bsEdW
Y4jd1e4GvUI1j2WSTuEdWxMKsRGWxi23HjkUlrBx91bs91oTfI0FznMW+SATGnqu
wZ6LuRSKufEQBkNdo8UjkG1w2mHsgg6L2cpoStE2tYG8z4paAxGjTseeKRx0/Ugi
aU6N91UhoEoB16zD+5/ku+aH86EsXFIyrVrayGaHTBVqMM3DNYIaqgG8L9yfXjvE
+JrkGlpTRCxc163n7ityvh8PxRH54ZdPwxuC6UwWaSM/qCyMbXCHSq7+vOMzQXy0
71gV/+9VLRQcyK5asBhHfrel3JhI+FoGfzxvVtAUCTCsk9kBqcL83DZaUFbNzCcW
TrremykuMyLux+AuNqJGpLbmVlsmL0PeUOHbLbRVVmjdC43na4psl9/7IUF1euEC
AAUYhfUztfmkYWJbnRI5h8hZDPUG7P2pKtDix9/l4mTDWdUKGHSNY61PBSc2mWhH
xgQAe2VLKU89QBfQ4FFDsUtPc2xiApOEd0JNLDqztQxzFocBOl6E8KTh1/2KYdAA
jjfkOPCkIKHT87jdjCYI7gAei895TNezfdN5FVlLO9c0OWwj5sW0dMwwxljn+3sg
sQMKxUZL2r7Kb98nHzbbyvMCAwEAAQ==
-----END PUBLIC KEY-----`;


exports.subscriptionCreate = functions.https.onRequest(async (request, response) => {
  if (verifyPaddleWebhook(pubKey, request.body)) {
    const data = request.body;
    delete data.p_signature;
    if (data.alert_name === 'subscription_created' && data.passthrough) {
      data.uid = data.passthrough;
    }
    await admin.firestore().collection('subscriptions').doc(data.subscription_id).set({
      email: data.email,
       cancelURL: data.cancel_url,
       UpdateURL: data.update_url,
       subID: data.subscription_id,
       state: data.status,
       userId: data.user_id,
      }, {merge: true});
    await admin.firestore().collection('subscriptions').doc(data.subscription_id).collection('Payments').doc(data.alert_id).set(data, {merge: true});
  }
  response.send(true);
  // response.send("Hello from Firebase!");
});

exports.subscriptionUpdated = functions.https.onRequest(async (request, response) => {
  if (verifyPaddleWebhook(pubKey, request.body)) {
    const data = request.body;
    delete data.p_signature;
    if (data.alert_name === 'subscription_updated_succeeded' && data.passthrough) {
      data.uid = data.passthrough;
    }

    await admin.firestore().collection('subscriptions').doc(data.subscription_id).collection('Payments').doc(data.alert_id).set(data, {merge: true});
  }
  response.send(true);
  // response.send("Hello from Firebase!");
});


