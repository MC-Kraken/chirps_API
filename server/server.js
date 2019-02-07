const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = '3000'
const mysql = require('mysql')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//////////CONNECTION//////////
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'BeGre@t2019',
    database: 'chirpr'
});

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
    let query = "SELECT * FROM Users WHERE id = ?";

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
