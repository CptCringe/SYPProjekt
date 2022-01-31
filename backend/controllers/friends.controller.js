//friends controller
const sqllite3 = require('sqlite3');
let db = new sqllite3.database('../DB/VocaBattleDB.db', sqllite3.OPEN_READWRITE);

//TODO: Testen
exports.getFriends = (req, res) => {
    let sql = 'select friend from friends where user==?';
    let sql2 = 'select username from Users where UsedID==?'
    db.all(sql, req.body.userId, (err, rows) => {
       if(err){
           res.status(500).send({message: err.message});
           return;
       }
       let allfriends= []
       rows.forEach((row) =>
       {
           db.get(sql2, row.friend, (error, row) =>
           {
               if(error){
                   res.status(500).send({message: err.message});
                   return;
               }
               allfriends.push(row.username);
           });
       });
       res.status(200).send({friends: allfriends});
    });
}

function addFriend(){
    return undefined;
}

function removeFriend(){
    return undefined;
}