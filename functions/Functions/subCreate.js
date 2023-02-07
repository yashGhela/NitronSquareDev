const crypto = require('crypto');
const Serialize = require('php-serialize');
const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp();


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
-----END PUBLIC KEY-----`

function ksort(obj){
    const keys = Object.keys(obj).sort();
    let sortedObj = {};

    for (let i in keys) {
        sortedObj[keys[i]] = obj[keys[i]];
    }

    return sortedObj;
}

function validateWebhook(jsonObj) {
    const mySig = Buffer.from(jsonObj.p_signature, 'base64');
    delete jsonObj.p_signature;
    // Need to serialize array and assign to data object
    jsonObj = ksort(jsonObj);
    for (let property in jsonObj) {
        if (jsonObj.hasOwnProperty(property) && (typeof jsonObj[property]) !== "string") {
            if (Array.isArray(jsonObj[property])) { // is it an array
                jsonObj[property] = jsonObj[property].toString();
            } else { //if its not an array and not a string, then it is a JSON obj
                jsonObj[property] = JSON.stringify(jsonObj[property]);
            }
        }
    }
    const serialized = Serialize.serialize(jsonObj);
    // End serialize data object
    const verifier = crypto.createVerify('sha1');
    verifier.update(serialized);
    verifier.end();

    const verification = verifier.verify(pubKey, mySig);

    return verification;
}

exports.webhookPaddle = functions.https.onRequest(async (request, response) => {
    if (validateWebhook(request.body)) {
        var data = request.body;
        delete data.p_signature;
        if (data.alert_name === 'subscription_created' && data.passthrough) {
            data.uid = data.passthrough;
        }
        await admin.firestore().collection('subscriptions').doc(data.subscription_id).set(data, {merge: true});
        await admin.firestore().collection('subscriptions').doc(data.subscription_id).collection('event').doc(data.alert_id).set(data, {merge: true});
    }
    response.send(true)
    // response.send("Hello from Firebase!");
});