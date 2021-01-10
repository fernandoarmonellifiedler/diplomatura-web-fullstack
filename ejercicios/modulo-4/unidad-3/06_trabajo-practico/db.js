/* ========== REQUIRES ========== */
const mysql = require('mysql');
const util = require('util');
const settings = require('./settings.json');
const db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);

        db.connect(err => {
            if (!err) {
                console.log("Ya estas conectado con la base de datos");
            } else {
                console.log("Error conectando con la base de datos!")
            }
        });
    }

    db.query = util.promisify(db.query);

    return db;
};

module.exports = connectDatabase();