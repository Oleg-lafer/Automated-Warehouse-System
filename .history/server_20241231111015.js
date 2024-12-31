const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const Item = require('./src/item');
const User = require('./src/user');
const Action = require('./src/action');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to the SQLite database
let db = new sqlite3.Database('./src/database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get items
app.get('/getItems', (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Endpoint to add a new item
app.post('/addItem', (req, res) => {
    const { name, qty, barcode } = req.body;
    const sql = `INSERT INTO items (name, qty, barcode) VALUES (?, ?, ?)`;
    db.run(sql, [name, qty, barcode], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Endpoint to add a new user
app.post('/addUser', (req, res) => {
    const { name, permission, borrowedItems } = req.body;
    const sql = `INSERT INTO users (name, permission, borrowedItems) VALUES (?, ?, ?)`;
    db.run(sql, [name, permission, borrowedItems], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Endpoint to get users
app.get('/getUsers', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Endpoint to add a new action
app.post('/addAction', (req, res) => {
    const { actionType, userId } = req.body;
    const sql = `INSERT INTO actions (actionType, userId) VALUES (?, ?)`;
    db.run(sql, [actionType, userId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ actionId: this.lastID });
    });
});

// Endpoint to get actions
app.get('/getActions', (req, res) => {
    db.all('SELECT * FROM actions', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});