const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, } = require('firebase-admin/firestore');
const { getAuth, } = require('firebase-admin/auth');

const serviceAccount = require('./config/serviceAccountKey.json');

/** Firestore DB instance */
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();
const auth = getAuth();

module.exports = {db, auth};