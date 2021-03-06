const controller = require('../controllers/voclists.controller');
const voclistsUrl = '/api/voclists';

module.exports = function (app){
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(voclistsUrl, controller.getListSignatures)	//StandardUrl -> getAllPrivate
    app.get(voclistsUrl + '/getAllPublic', controller.getPublicListSignatures)
    app.get(voclistsUrl + '/getListById', controller.getLists)      //Listen + Listeninhalt
    app.post(voclistsUrl, controller.createList)    //creating List
}