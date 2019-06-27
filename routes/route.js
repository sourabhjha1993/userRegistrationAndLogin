const express = require('express')

let router = express.Router();

router.use('/user', require('../controllers/userController'));

router.use((_,res) => {
    res.status(404).send("Sorry can't find the route")
})

module.exports = router;

