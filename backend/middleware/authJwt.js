const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const sqlite3 = require("sqlite3");
let db = new sqlite3.Database('../DB/VocaBattleDB.db',sqlite3.OPEN_READWRITE);

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
isAdmin = (req, res, next) => {
    // User.findByPk(req.userId).then(user => {
    //     user.getRoles().then(roles => {
    //         for (let i = 0; i < roles.length; i++) {
    //             if (roles[i].name === "admin") {
    //                 next();
    //                 return;
    //             }
    //         }
    //         res.status(403).send({
    //             message: "Require Admin Role!"
    //         });
    //         return;
    //     });
    // });
    let sql = `select * from users_roles join Roles on users_roles.roleId == Roles.id where userId == ?;`;
    let userId = req.userId;
    // first row only
    db.each(sql, [userId], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if(row.name === "admin") return row;
    });
    res.status(403).send({
        message: "Require Admin Role!"
    })
};
isModerator = (req, res, next) => {
    // User.findByPk(req.userId).then(user => {
    //     user.getRoles().then(roles => {
    //         for (let i = 0; i < roles.length; i++) {
    //             if (roles[i].name === "moderator") {
    //                 next();
    //                 return;
    //             }
    //         }
    //         res.status(403).send({
    //             message: "Require Moderator Role!"
    //         });
    //     });
    // });
    let sql = `select * from users_roles join Roles on users_roles.roleId == Roles.id where userId == ?;`;
    let userId = req.userId;

    db.each(sql, [userId], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if(row.name === "moderator") return row;
    });
    res.status(403).send({
        message: "Require Moderator Role!"
    })
};
isModeratorOrAdmin = (req, res, next) => {
    // User.findByPk(req.userId).then(user => {
    //     user.getRoles().then(roles => {
    //         for (let i = 0; i < roles.length; i++) {
    //             if (roles[i].name === "moderator") {
    //                 next();
    //                 return;
    //             }
    //             if (roles[i].name === "admin") {
    //                 next();
    //                 return;
    //             }
    //         }
    //         res.status(403).send({
    //             message: "Require Moderator or Admin Role!"
    //         });
    //     });
    // });
    let sql = `select * from users_roles join Roles on users_roles.roleId == Roles.id where userId == ?;`;
    let userId = req.userId;

    db.each(sql, [userId], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if(row.name === "admin" ||row.name === "moderator") return row;

    });
    res.status(403).send({
        message: "Require Admin or Moderator Role!"
    })
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;