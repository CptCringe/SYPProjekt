const sqllite3 = require('sqlite3');
const fs = require("fs");
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
            if(err)
            {
                res.status(500).send({message: err.message});
                reject(err);
            }

            let allLists = [];
            //console.log(rows);
            rows.forEach((r) => {
                allLists.push({listId: r.Id, listName: r.Name})
            });
            resolve(allLists);
        });

    });
}

exports.getLists = async (req,res) => {

    const listId = req.query.listId;
    if(typeof req.query.listId == "undefined") {res.status(404).send("No List Params"); console.log("No Params")
    }else{
        let sql = 'select path from VocLists where Id == ?'
        let data = await getListById(listId, sql, res);
        res.status(200).send(JSON.stringify(data));
    }
}

function getListById(id, sql, res){
    return new Promise( async (resolve, reject) =>{
        db.get(sql, [id], (err,row) => {
            if(err)
            {
                res.status(500).send({message: err.message});
                reject(err);
            }

            if(typeof row == "undefined"){
                res.status(404).send("No Path found");
                reject("No Path found");
            }


            let path = row.Path;

            const result = [];
            console.log(__dirname)
            let file = fs.readFileSync(path, 'utf-8');
            let filearr = file.split('\r\n');
            for(let i =0; i < filearr.length -1; i+=1){
                let line = filearr[i].split(';');
                result.push({Deutsch: line[0], Englisch: line[1]});
            }

            resolve(result);
        })

    })
}

exports.createList = (req, res) => {
    //name, creator, isprivate, to/fromlanguage, path
    const listname = req.query.listname;
    const creator = req.query.creator;
    const isPriv = req.query.isprivate;
    const tolanguage = req.query.tolanguage;
    const fromlanguage = req.query.fromlanguage;

    let sql = 'INSERT INTO VocLists(Id,Name,Creator,Is_private,Path,ToLanguage,FromLanguage) VALUES ()'
}