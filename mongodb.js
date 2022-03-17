const mongodb= require('mongodb');
const MongoClient = mongodb.MongoClient; //to interact with mongodb
const dbName='users';
const MONGODB_URL=`mongodb+srv://philojeni:philpass4@cluster0.cy0fc.mongodb.net/${dbName}`
// let dbName = 'usersCollection';
module.exports={MongoClient,mongodb,MONGODB_URL}
