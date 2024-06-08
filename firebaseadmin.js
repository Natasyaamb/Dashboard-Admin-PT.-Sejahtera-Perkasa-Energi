// var admin = require("firebase-admin");
// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://sistem-operasional-app-default-rtdb.firebaseio.com/"
// });

// async function getUsersData() {
//   try {
//     const listUsersResult = await admin.auth().listUsers();
//     return listUsersResult.users.map((userRecord) => userRecord.toJSON());
//   } catch (error) {
//     console.log('Error listing users:', error);
//     return [];
//   }
// }

// module.exports = { getUsersData };
