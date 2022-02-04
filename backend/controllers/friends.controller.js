//friends controller
const sqllite3 = require('sqlite3');
let db = new sqllite3.Database('../DB/VocaBattleDB.db', sqllite3.OPEN_READWRITE);

//TODO: Testen
exports.getFriends = (req, res) => {
    let sql = 'select friend from Friends where user==?';
    let sql2 = 'select username from Users where UserID==?'
    db.all(sql, req.body.userId, (err, rows) => {
       if(err){
           res.status(500).send({message: err.message});
           return;
       }
       let allfriends= []
       rows.forEach((row) =>
       {
           db.get(sql2, row.friend, (error, rw) =>
           {
               if(error){
                   res.status(500).send({message: err.message});
                   return;
               }
               allfriends.push({userId: row.userId, username: rw.username});
           });
       });
       res.status(200).send({friends: allfriends});
    });
}

exports.addFriend = (req, res) => {
    const user = req.body.userId;
    const friend = req.body.friendId;
    let sql = `INSERT INTO Friends(user, friend) VALUES (${user},${friend})`;
    let sql2 = `INSERT INTO Friends(user, friend) VALUES (${friend},${user})`;
    db.run(sql, (err) => {
        if(err)
        {
            res.status(500).send({message: err.message});
            return;
        }

        db.run(sql2, (error) => {
            if(error){
                res.status(500).send({message: err.message});
                return;
            }
            res.send(`User ${req.body.userId} and User ${req.body.friendId} are now friends.`)
        })
    })
}

exports.removeFriends = (req, res) => {
    return undefined;
}