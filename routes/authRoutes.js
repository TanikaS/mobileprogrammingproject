const express = require('express');
const authRoutes = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const dbConfig = {
  host: '35.228.84.185',
  user: 'root',
  password: 'heippa123',
  database: 'app', 
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

authRoutes.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertUserQuery, [username, email, hash], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'Registration successful' });
      });
    });
  });
});

authRoutes.post('/login', (req, res) => {
  const { email, password } = req.body;

  const getUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(getUserQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    bcrypt.compare(password, results[0].password, (err, passwordMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      res.status(200).json({ message: 'Login successful' });
    });
  });
});

module.exports = authRoutes;
