const sqllite3 = require('sqlite3');
let db = new sqllite3.Database('../DB/VocaBattleDB.db', sqllite3.OPEN);

exports.getListSignatures = async (req, res) =>
{
    const userId = req.query.userId;
    let sql = 'select Id, Name from VocLists where Creator == ?';   //private lists
    let data = await getListSignaturesHelper(userId, sql, res);
    //console.log(data);
    res.status(200).send(JSON.stringify(data));
}

function getListSignaturesHelper(userId, sql, res){
    return new Promise(async (resolve, reject) =>
    {
        db.all(sql, [userId], (err,rows)=>
        {
            if(err) {res.status(500).send({message: err.message}); reject(err);};

            let allLists = [];
            //console.log(rows);
            rows.forEach((r) => {
                allLists.push({listId: r.Id, listName: r.Name})
            });
            resolve(allLists);
        });

    });
}

exports.getLists = (req,res) => {
    //Listen mit Inhalt und allem drum und dran (schwerer)
}