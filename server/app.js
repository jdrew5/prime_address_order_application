var express = require('express');
var app = express();
var index = require('./routes/index.js');

var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/prime_address_order_application';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Get all the users
app.get('/getusers', function(req,res){
    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {

        var query = client.query("SELECT user_id, name FROM users");

        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

// Get addresses for a users
app.get('/getaddresses', function(req,res){
    var results = [];

    var selectedUser = {
        "user_id" : req.query.user_id
    };

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {

        var query = client.query("SELECT address_id, " +
                                    "user_id, " +
                                    "address_type, " +
                                    "address_street, " +
                                    "address_city, " +
                                    "address_state, " +
                                    "address_zip, " +
                                    "date_added " +
                                "FROM addresses " +
                                "WHERE user_id = $1", [selectedUser.user_id]);

        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

// Get orders for a users
app.get('/getorders', function(req,res){
    var results = [];

    var selectedUser = {
        "user_id" : req.query.user_id,
        "start_date": req.query.start_date,
        "end_date": req.query.end_date
    };

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {

        var query = client.query("SELECT " +
                                    "addresses.address_id, " +
                                    "addresses.user_id, " +
                                    "addresses.address_type, " +
                                    "addresses.address_street, " +
                                    "addresses.address_city, " +
                                    "addresses.address_state, " +
                                    "addresses.address_zip, " +
                                    "addresses.date_added, " +
                                    "orders.order_id, " +
                                    "orders.user_id, " +
                                    "orders.ship_address_id, " +
                                    "orders.amount, " +
                                    "orders.order_date, " +
                                    "users.user_id, " +
                                    "users.name " +
                                "FROM " +
                                    "users " +
                                    "JOIN orders on users.user_id = orders.user_id " +
                                    "JOIN addresses on orders.ship_address_id = addresses.address_id " +
                                "WHERE " +
                                    "users.user_id = $1 " +
                                    "and order_date between $2 and $3;", [selectedUser.user_id, selectedUser.start_date, selectedUser.end_date]);

        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

app.use('/', index);

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;