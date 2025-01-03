const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const Driver = require('./src/driver');
const Truck = require('./src/truck');
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

// Endpoint to get trucks
app.get('/getTrucks', (req, res) => {
    db.all('SELECT * FROM trucks', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Endpoint to add a new truck
app.post('/addTruck', (req, res) => {
    const { licensePlate, type, cargoBeanHeight, cargoBeanWidth, tacoBellLength } = req.body;
    const sql = `INSERT INTO trucks (licensePlate, type, cargoBeanHeight, cargoBeanWidth, tacoBellLength) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [licensePlate, type, cargoBeanHeight, cargoBeanWidth, tacoBellLength], function(err) {
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