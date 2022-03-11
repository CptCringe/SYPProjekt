const sqlite3 = require("sqlite3");
let db = new sqlite3.Database('../DB/VocaBattleDB.db',sqlite3.OPEN_READWRITE);

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    // User.findOne({
    //     where: {
    //         username: req.body.username
    //     }
    // }).then(user => {
    //     if (user) {
    //         res.status(400).send({
    //             message: "Failed! Username is already in use!"
    //         });
    //         return;
    //     }
    //     // Email
    //     User.findOne({
    //         where: {
    //             email: req.body.email
    //         }
    //     }).then(user => {
    //         if (user) {
    //             res.status(400).send({
    //                 message: "Failed! Email is already in use!"
    //             });
    //             return;
    //         }
    //         next();
    //     });
    //});
    // Username
    let username = req.body.username;
    let sql = 'select * from Users where username = ?';
    db.all(sql,[username],(err, rows ) => {
        //if(err) res.send({message: err.message});
        if(rows.length > 0) res.status(400).send({message: "Failed! Username already exists = " + req.body.username});

    });
    // Email
    let email = req.body.email;
    let sql2 = 'select * from Users where username =  ?';
    db.all(sql2,[email],(err, rows ) => {
        if(rows.length > 0) res.status(400).send({message: "Failed! Email already exists = " + req.body.email});
    });
    next();
};

checkRolesExisted = (req, res, next) => {
    // if (req.body.roles) {
    //     for (let i = 0; i < req.body.roles.length; i++) {
    //         if (!ROLES.includes(req.body.roles[i])) {
    //             res.status(400).send({
    //                 message: "Failed! Role does not exist = " + req.body.roles[i]
    //             });
    //             return;
    //         }
    //     }
    // }
    // next();
    if(req.body.roles)
    {
        for (let i = 0; i < req.body.roles.length; i++) {
            let sql = 'select * from Roles where id = ?';
            let roleId = i;
            db.all(sql,[roleId],(err, rows ) => {
                if(rows.length === 0) res.status(400).send({message: "Failed! Role does not exist = " + req.body.roles[i]});
                return;
            });
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;