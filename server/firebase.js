  const admin = require('firebase-admin');

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
    process.exit(1); // Exit if Firebase initialization fails
  }
}

const db = admin.firestore();

module.exports = { db };
