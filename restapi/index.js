const express = require('express');
const app = express();
const fs = require("fs");
const sqlite3 = require('sqlite3')
let db = new sqlite3.Database('../DB/VocaBattleDB.db',sqlite3.OPEN_READWRITE);
const authRoute = require("./routes/auth")
const cors = require('cors');
app.use(cors())
app.use('/api/auth',authRoute)


// TEST SQLLITE 3
let sql = `SELECT * FROM Users`;

db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row.username);
    });
})

app.get('/listUsers', function (req, res) {

        res.end( 'Hello World' );
    
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

db.close()
