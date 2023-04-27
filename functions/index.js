

const admin = require('firebase-admin');
const {https, logger} = require('firebase-functions');

const bent = require('bent');


admin.initializeApp();

const CLIENTID='ATV2Co73t1tlgpv3pR_tKU7RQVo4CO1cpwLj-KQ4XFuVDzi1BfDKpcl83XnVeE1ynQZOYuDnIHcx2fB2';
const SECRET='EFW45r53knvyP18tZY2mFVWhGod9a4YpfM6R4kftC9_WzRHTpkV9FFgHHZDPlfDn3HpIpxpxmMj-DbFp';


exports.cancelPaypalSubscription = https.onCall(async (data, context) => {
  try {
    // Verify the Firebase ID token
    const token = context.auth.token;
    const decodedToken = admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Call the PayPal API to cancel the subscription
    const id = data.id;
    const post = bent(
      'https://api.sandbox.paypal.com/v1/billing/subscriptions/' + id,
      'POST',
      {
        'Authorization': 'Basic ' + Buffer.from(`${CLIENTID}:${SECRET}`).toString('base64'),
        'Content-Type': 'application/json',
      },
    );
    await post('/cancel', {reason: 'User account deleted'});

    // Log the cancellation and return a success message
    logger.info(`PayPal subscription ${id} cancelled by user ${uid}.`);
    return {message: `PayPal subscription ${id} cancelled successfully.`};
  } catch (error) {
    // Log the error and return an error message
    logger.error(`Error cancelling PayPal subscription: ${error}`);
    throw new https.HttpsError('internal', 'Error cancelling PayPal subscription.');
  }
});
