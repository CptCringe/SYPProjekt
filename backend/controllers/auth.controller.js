const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3");
let db = new sqlite3.Database('../DB/VocaBattleDB.db',sqlite3.OPEN_READWRITE);

exports.signup = (req, res) => {
    // Save User to Database
    let sql = 'INSERT into Users(username,hashPassw,email) values (?,?,?)'
    db.run(sql, [req.body.username, bcrypt.hashSync(req.body.password,10), req.body.email], function(err){
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
    // User.findOne({
    //     where: {
    //         username: req.body.username
    //     }
    // })
    //     .then(user => {
    //         if (!user) {
    //             return res.status(404).send({ message: "User Not found." });
    //         }
    //
    //         var passwordIsValid = bcrypt.compareSync(
    //             req.body.password,
    //             user.password
    //         );
    //
    //         if (!passwordIsValid) {
    //             return res.status(401).send({
    //                 accessToken: null,
    //                 message: "Invalid Password!"
    //             });
    //         }
    //
    //         var token = jwt.sign({ id: user.id }, config.secret, {
    //             expiresIn: 86400 // 24 hours
    //         });
    //
    //         var authorities = [];
    //         user.getRoles().then(roles => {
    //             for (let i = 0; i < roles.length; i++) {
    //                 authorities.push("ROLE_" + roles[i].name.toUpperCase());
    //             }
    //             res.status(200).send({
    //                 id: user.id,
    //                 username: user.username,
    //                 email: user.email,
    //                 roles: authorities,
    //                 accessToken: token
    //             });
    //         });
    //     })
    //     .catch(err => {
    //         res.status(500).send({ message: err.message });
    //     });

    const username = req.body.username;
    const password = req.body.password;
    const sql = "select * from Users where username == ?"
    db.get(sql, [username], (err, row) =>{
        if(row == null) res.status(404).send({message: 'User not found'});
        if (err) {
            res.status(500).send({ message: err.message });
            return;
        }
        let pw = row.hashPassw;
        let userId = row.UserID;
        let username1 = row.username;
        let email1 = row.email;

        if(!bcrypt.compareSync(password,pw))
        {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        let token = jwt.sign({id: userId},config.secret,{expiresIn: 86400});
        let authorities = [];
        const sql2 = "select Roles.name from users_roles join roles on users_roles.roleId == Roles.id where users_roles.userId == ?;"
        db.all(sql2, [userId], (err, rows) =>{
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }
            rows.forEach((row) =>{
                authorities.push(row.Name);
            })
            res.status(200).send({
                id: userId,
                username: username1,
                email: email1,
                roles: authorities,
                accessToken: token
            });
        });
    })
};