const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = '8000';
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken')


//////////CONNECTION//////////
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'BeGre@t2019',
    database: 'chirpr'
});


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());



//////////GET ALL USERS//////////
app.get('/users', function (req, res) {
    let query = "SELECT * FROM Users";

    pool.query(query, [req.params.id], (err, results, fields) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});

//////////GET ONE USER//////////
app.get('/users/:id', function (req, res) {
    let query = "SELECT * FROM Users WHERE id = ?";

    pool.query(query, [req.params.id], (err, results, fields) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});

//////////GET ALL CHIRPS//////////
app.get('/chirps', function (req, res) {
    let query = "SELECT * FROM Chirps";

    pool.query(query, [req.params.text], (err, results, fields) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});

//////////GET ALL CHIRPS FROM A SPECIFIC USER//////////
app.get('/chirps/:userid', function (req, res) {
    let query = "SELECT * FROM Chirps WHERE userid = ?";

    pool.query(query, [req.params.userid], (err, results, fields) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});

//////////DELETE A USER//////////
app.delete('/users/:id', function (req, res) {
    let query = "DELETE * FROM Users WHERE id = ?";

    pool.query(query, [req.params.id], (err, results, fields) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});

//////////DELETE A CHIRP//////////
app.delete('/chirps/:id', function (req, res) {
    let query = "SELECT * FROM Chirps WHERE id = ?";

    pool.query(query, [req.params.id], (err, results, fields) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});

//////////UPDATE A USER//////////
app.put('/users', function (req, res) {
    let query = "UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?";

    let data = [req.body.name, req.body.email, req.body.password, req.body.id];

    pool.query(query, data, (err, results) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});

//////////CREATE A USER//////////
app.post('/users/', function (req, res) {
    let query = `INSERT INTO Users(name, email, password) VALUES(?, ?, ?)`;

    let data = [`${req.body.name}`, `${req.body.email}`, `${req.body.password}`]

    pool.query(query, data, (err, results, fields) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});




//////////////////////////////////////////////////////////////////MOCK START/////////////////////////////////////////////////////////

const path = require('path');

//////////TELLING SERVER WHERE TO LOOK FOR FILES//////////
const pathJoin = path.join(__dirname + '/views');
app.use(express.static(path.join(__dirname + '/views')));
app.set('view engine', 'ejs');

////////////////MOCK FORM///////////////
app.get('/index', function (req, res) {
    res.render(pathJoin + '/index');
});


//////////MOCK GET USER LOGIN//////////
app.get('/users/login', function (req, res) {
    let query = "SELECT * FROM Users";

    pool.query(query, [req.params.id], (err, results, fields) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});


//////////MOCK POST//////////
app.post('users/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});



//////////MOCK LOGIN AUTH//////////
app.post('/users/login', function (req, res) {

    const user = {
        email: 'blake@yahoo.com',
        password: 'Birmingham'
    }

    jwt.sign({ user }, 'secretkey', { expiresIn: '60s'}, (err, token) => {
        res.json({
            token
        })
    });
});



//////////VERIFY TOKEN FUNCTION//////////
function verifyToken(req, res, next) {
    //////////GET AUTH HEAD VALUE//////////
    const bearerHeader = req.headers['authorization'];
    //////////CHECK IF HEADER IS UNDEFINED//////////
    if (typeof bearerHeader !== 'undefined') {
        //////////SPLIT AT THE SPACE////////// 
        const bearer = bearerHeader.split(' ');
        //////////GET TOKEN FROM ARRAY//////////
        const bearerToken = bearer[1];
        //////////SET THE TOKEN//////////
        req.token = bearerToken;
        //////////NEXT MIDDLEWARE//////////
        next();
    } else {
        //////////FORBIDDEN//////////
        res.sendStatus(403);
    }


}





//////////////////////////////////////////////////////////MOCK END//////////////////////////////////////////////////////////






//////////CREATE A CHIRP//////////
app.post('/chirps/', function (req, res) {
    let query = `INSERT INTO Chirps(userid, text, location) VALUES(?, ?, ?)`;

    let data = [`${req.body.userid}`, `${req.body.text}`, `${req.body.location}`]

    pool.query(query, data, (err, results, fields) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});


//////////LISTEN TO PORT//////////
app.listen(port, function () {
    console.log('Server is listening to port ' + port)
});
