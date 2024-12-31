const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const Driver = require('./src/driver');
const Item = require('./src/item');
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

// Endpoint to add a new driver
app.post('/addDriver', (req, res) => {
    const { name, familyName, driverLicense, status } = req.body;
    const sql = `INSERT INTO drivers (name, familyName, driverLicense, status) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, familyName, driverLicense, status], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Endpoint to get drivers
app.get('/getDrivers', (req, res) => {
    db.all('SELECT * FROM drivers', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

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

// Endpoint to delete a driver
app.delete('/deleteDriver/:id', (req, res) => {
    const driverId = req.params.id;
    const sql = 'DELETE FROM drivers WHERE id = ?';
    db.run(sql, driverId, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).send('Driver deleted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});