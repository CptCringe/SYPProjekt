exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

//sollte funktionieren
//ohne abhängigkeit der Freundes listen
exports.edituser = (req, res) => {  //updatet nur den username
    const userId = req.query.userid;
    const username = req.query.username;

    let sql = 'UPDATE Users SET username == ? where UserID==?';
    db.run(sql, [username, userId], (error) => {
        if(error){
            res.status(500).send({message: error.message});
            return;
        }
        res.status(200).send('Username changed successfully.');
    })
}