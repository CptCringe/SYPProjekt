const sqllite3 = require('sqlite3');
const fs = require("fs");
let db = new sqllite3.Database('../DB/VocaBattleDB.db', sqllite3.OPEN);

// is_private == 1 (privat) // is_private == 0 (öffentlich)
exports.getListSignatures = async (req, res) =>
{
    const userId = req.query.userId;
    let sql = 'select Id, Name from VocLists where Creator == ?';   //private lists
    let data = await getListSignaturesHelper(userId, sql, res);
    res.status(200).send(JSON.stringify(data));
}

exports.getPublicListSignatures = async (req, res) =>{
    const accessId = 0;   //0 sind publiclists, so umgeformt das ich den Helper gleich reusen kann
    let sql = 'select Id, Name from VocLists where Is_private == ?';
    let data = await getListSignaturesHelper(accessId, sql, res);
    res.status(200).send(JSON.stringify(data));
}

//Helper
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
            rows.forEach((r) => {
                allLists.push({listId: r.Id, listName: r.Name})
            });
            resolve(allLists);
        });

    });
}

//TODO: get List inhalte auch noch auf private anpassen
exports.getLists = async (req,res) => {
    const listId = req.query.listId;
    if(typeof req.query.listId == "undefined") {res.status(404).send("No List Params"); console.log("No Params")
    }else{
        let sql = 'select path from VocLists where Id == ?'
        let data = await getListById(listId, sql, res);
        res.status(200).send(JSON.stringify(data));
    }
}

//Helper
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
            let str = typeof(file);
            let filearr = file.split(/\n/g);
            for(let i =1; i < filearr.length -1; i+=1){
                let line = filearr[i].split(';');
                result.push({Deutsch: line[0], Englisch: line[1]});
            }
            resolve(result);
        })

    })
}

exports.createList = async (req, res) => {
    //name, creator, isprivate, to/fromlanguage, path
    const listname = req.query.listname;
    const creator = req.query.creator;
    const isPriv = req.query.isprivate;
    const tolanguage = req.query.tolanguage;
    const fromlanguage = req.query.fromlanguage;
    const path = `../Listen/${creator}_${listname}.vbl`;    //nur einmal raushüpfen (geht wahrscheinlich von server.js)
    const wordlist = req.body.voclist;     //Vokabelliste [{tolanguage: string, fromlanguage: string}]

    let sql = `INSERT INTO VocLists(Name,Creator,Is_private,Path,ToLanguage,FromLanguage)
                VALUES ("${listname}","${creator}",${isPriv},"${path}","${tolanguage}","${fromlanguage}")`;   //list sollte autoincrement sein deshalb keine angabe

    db.run(sql, (err) => {
        if(err){
            res.status(500).send({message: err.message});
            return;
        }
        res.status(200).send('list created');
    })
    //file schreiben
    writeVocFile(path, wordlist,fromlanguage,tolanguage);
}

function writeVocFile(path, data, fromlanguage, tolanguage){
    try{
        fs.writeFileSync(path, `${fromlanguage};${tolanguage}\n`);//file erstellung und überschrift
        data.forEach((item) =>{
            let line = `${item.fromLanguage};${item.toLanguage}\n`;
            fs.appendFile(path, line, (error) =>{
                if(error){
                    console.error(error)
                    return;
                }
            });
        });
        console.log('file created')
    }
    catch(err){
        console.log(err);
    }
}