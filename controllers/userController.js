const express = require('express');
const userService = require('../services/userService');
const mongoController = require('./mongoController');
const responseFormatter = require('./ResponseFormatter');
let jwt = require('jsonwebtoken');
let router = express.Router();


router.post('/register', registerUser);;
router.post('/login', userLogin);

//Registration function
async function registerUser(req, res) {
    data = req.body;
    try {
        response = await userService.register(mongoController.getDB(req), data)
        res.status(responseFormatter.SUCCESS_RESPONSE)
             .send(responseFormatter.transactionResponse(response.message))
    } catch (err) {
        res.status(500)
            .send(err)
    }

}


//login function
async function userLogin(req, res) {
    var data = req.body;
    var token;

    if (typeof req === 'undefined' || req === '' || req === null) {
        console.log("NO DATA");
        res.status(400).json("No username and password");
        return;
    }

    try {
        var response = await userService.login(mongoController.getDB(req), data)
        if (response.length > 0) {
            token = jwt.sign({ username: data.username },
                config.secret,
                {
                    expiresIn: '1h'
                }
            );
            res.status(responseFormatter.SUCCESS_RESPONSE).send(responseFormatter.queryResponse({ "message": "User authorized" }, token))
        }
        else {
            res.status(responseFormatter.SUCCESS_RESPONSE).send(responseFormatter.queryResponse({ "message": "Unauthorized user" }, token))
        }
    } catch (err) {
        res.status(500)
            .send(err)
    }
}

module.exports = router;