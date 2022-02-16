const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(jsonParser)
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Fabians application." });
});

//routes
require('./routes/auth.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/friends.routes')(app);
require('./routes/voclists.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server is running on port ${PORT}.`);
});