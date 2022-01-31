const controller = require('../controllers/friends.controller')

module.exports = function (app){
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/friends", controller.getFriends);
    //app.push()
    //app.delete()
}