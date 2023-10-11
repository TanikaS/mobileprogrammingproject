
const express = require('express');
const authRoutes = express.Router();
const bcrypt = require('bcryptjs');
const { openDatabase } = require('react-native-sqlite-storage');

const db = openDatabase({ name: 'app.db' });
db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS users ' +
      '(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'email TEXT UNIQUE NOT NULL, ' +
      'password TEXT NOT NULL);',
    [],
    () => {
      console.log('Authentication table created successfully.');
    },
    (error) => {
      console.error('Error creating authentication table:', error);
    }
  );
});

authRoutes.post('/register', (req, res) => {
  const { email, password } = req.body;


  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (_, results) => {
        if (results.rows.length > 0) {
          return res.status(400).json({ error: 'Email is already registered' });
        }


        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'server error' });
          }

          tx.executeSql(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hash],
            (_, result) => {
              res.status(201).json({ message: 'Registration successful' });
            },
            (error) => {
              console.error(error);
              res.status(500).json({ error: 'server error' });
            }
          );
        });
      },
      (error) => {
        console.error(error);
        res.status(500).json({ error: 'server error' });
      }
    );
  });
});

authRoutes.post('/login', (req, res) => {
  const { email, password } = req.body;


  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (_, results) => {
        if (results.rows.length === 0) {
          return res.status(401).json({ error: 'Authentication failed' });
        }

        const user = results.rows.item(0);
        const hashedPassword = user.password;

     
        bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'server error' });
          }

          if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
          }

          res.status(200).json({ message: 'Login successful' });
        });
      },
      (error) => {
        console.error(error);
        res.status(500).json({ error: 'server error' });
      }
    );
  });
});

module.exports = authRoutes;
