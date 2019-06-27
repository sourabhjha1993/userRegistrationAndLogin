const UserService = {};
UserService.register = register;
UserService.login = login;
var ObjectId = require('mongodb').ObjectID;

config = require('../config')
var token;
async function register(db, data) {
    try {
        var duplicateVal = await db.collection('loginDetails').find({"username": data.username}).toArray();
        if(duplicateVal.length>0)
        {
            return ({"message":"User already exists."});   
        }
        var resp = await db.collection('loginDetails').insertOne(data)
        return ({"message":"User successfully registered"});
    } catch (err) {
        return err;
    }
}


async function login(db, data){
    try {

        var resp = await db.collection('loginDetails').find({"username": data.username, "password":data.password}).toArray();
        return resp;
    } catch(err){
        return err;
    }
}


module.exports = UserService;