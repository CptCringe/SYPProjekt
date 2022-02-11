//friends controller
const sqllite3 = require('sqlite3');
let db = new sqllite3.Database('../DB/VocaBattleDB.db', sqllite3.OPEN);

exports.getFriends = (req, res) => {
    const userId = req.body.userId;
    let sql = 'select friend from Friends where user == ?';
    let sql2 = 'select username from Users where UserID == ?'
    db.all(sql, [userId], (err, rows) => {
       if(err){
           res.status(500).send({message: err.message});
           return;
       }
       let allfriends = [];
       let username;
       rows.forEach((r) =>
       {
           db.get(sql2, r, (error, row) =>
           {
               if(error){
                   res.status(500).send({message: error.message});
                   return;
               }
               username = row.username;
           });
           allfriends.push({userId: r.userId, username: username});
       });
       res.status(200).send(allfriends);
    });
}

exports.addFriend = (req, res) => {
    const UserId = req.body.userId;
    const FriendId = req.body.friendId;
    let sql = `INSERT INTO Friends(user, friend) VALUES (${UserId},${FriendId})`;
    let sql2 = `INSERT INTO Friends(user, friend) VALUES (${FriendId},${UserId})`;
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
            res.status(200).send(`User ${UserId} and User ${FriendId} are now friends.`)
        })
    })
}

exports.removeFriends = (req, res) => {
    const UserId = req.body.userId;
    const FriendId = req.body.friendId;
    let sql = 'DELETE FROM Friends WHERE user==? and friend==?';
    db.run(sql, [UserId, FriendId], (err) => {
        if(err){
            res.status(500).send({message: err.message});
            return;
        }
        res.status(200).send(`Friend ${FriendId} from User ${UserId} deleted.`);
    })
}