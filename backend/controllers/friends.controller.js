//friends controller
const sqllite3 = require('sqlite3');
let db = new sqllite3.Database('../DB/VocaBattleDB.db', sqllite3.OPEN);

exports.getFriends = async (req, res) => {
    const userId = req.query.userId;
    let sql = 'select friend, users.username from Friends join Users on friend = users.userID where user == ?';

    let data = await getAllFriends(userId, sql,res);
    console.log(data);
    res.status(200).send(JSON.stringify(data));
}

function getAllFriends(userId, sql, res){

    return new Promise(async (resolve,reject)=>{
        db.all(sql, [userId], (err, rows) => {
            if(err){
                res.status(500).send({message: err.message});
                reject(err);
            }
            let allfriends = [];
            let username;
            console.log(rows);

            rows.forEach((r) =>
            {
                allfriends.push({userId: r.friend, username: r.username});
            });
            resolve(allfriends);

        });
    })
}

exports.addFriend = (req, res) => {
    const UserId = req.body.userId;
    const FriendId = parseInt(req.body.friendId["id"]);
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
    const UserId = parseInt(req.query.userId);
    const FriendId = parseInt(JSON.parse(req.query.friendId)["id"]);
    let sql = 'DELETE FROM Friends WHERE user==? and friend==?';
    db.run(sql, [UserId, FriendId], (err) => {
        if(err){
            res.status(500).send({message: err.message});
            return;
        }
        res.status(200).send(`Friend ${FriendId} from User ${UserId} deleted.`);
    })
}