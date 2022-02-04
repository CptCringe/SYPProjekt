const controller = require('../controllers/friends.controller')
const friendUrl = '/api/friends';

module.exports = function (app){
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(friendUrl, controller.getFriends);
    app.post(friendUrl, controller.addFriend);
    //app.delete()
}