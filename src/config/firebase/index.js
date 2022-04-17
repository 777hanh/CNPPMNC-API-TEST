const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('./serviceAccountKey.json');
const a = require('./serviceAccountKeyhaha')

function connect() {
    try {
        // const appAdmin = admin.initializeApp(firebaseConfig);
        initializeApp({
            credential: cert(serviceAccount)
        });
        console.log("Firebase connection is successfully");
    } catch (error) {
        console.log(`Mongoose Connection is failure!!!`);
        process.exit(1);
    }
}

// admin.initializeApp(firebaseConfig);

module.exports = { connect } 