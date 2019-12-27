const admin = require('firebase-admin');

let serviceAccount;

try {
  if (process.env.NODE_ENV === 'development') {
    serviceAccount = require('../../firebase-credentials.json');
  } else {
    serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
    };
  }

  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} catch (e) {
  console.error(e);
}

const db = admin.firestore();

module.exports = db;
