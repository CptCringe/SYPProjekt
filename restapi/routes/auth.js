const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const sqlite3 = require("sqlite3");
const router = express.Router()
let db = new sqlite3.Database('../DB/VocaBattleDB.db',sqlite3.OPEN_READWRITE);
const rounds = 10
const jsonParser = bodyParser.json()

router.get('/login', (req, res) => {

});

router.post('/signup', jsonParser,(req, res) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        username: req.body.username,
        email: req.body.email,
        password : bcrypt.hashSync(req.body.password,rounds)      // PASSWORD BEIM CLIENT VERSCHLÜSSELN
    }
    var sql ='INSERT INTO users (username, email, hashPassw) VALUES (?,?,?)'
    var params =[data.username, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

module.exports = router