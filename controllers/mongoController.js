const
    mongoController = {},
    config = require('../config');

mongoController.getDB = getDB;

function getDB(req) {
    var client = req.app.get('mongodb');
    const db = client.db(config.DATABASE_NAME);
    return db;
}

module.exports = mongoController;