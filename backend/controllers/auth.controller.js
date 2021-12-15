
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3");
let db = new sqlite3.Database('../DB/VocaBattleDB.db',sqlite3.OPEN_READWRITE);


// TODO auf sqlite3 umbauen

exports.signup = (req, res) => {
    // Save User to Database

    let sql = 'INSERT into Users(username,hashPassw,email) values (?,?,?)'
    db.run(sql, [req.body.username, req.body.password, req.body.email], function(err){
       if(err){
           res.status(500).send({ message: err.message });
           return
       }


    });

    let sql2 = 'select UserID from Users where username == ?'
    db.get(sql2, [req.body.username], (err,row) =>{
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }

        let sql3 = 'Insert into users_roles(userId, roleId) values (?,?)'
        db.run(sql3,[row.UserID,1], (err) =>{
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }

            res.send({ message: "User was registered successfully!" });
        })

    })

};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};