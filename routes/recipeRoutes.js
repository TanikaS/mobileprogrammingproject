const express = require('express');
const router = express.Router();
const pool = require('../dbConfig');


router.post('/recipes', (req, res) => {
  const { title, description, category, cookTime, ingredients, instructions } = req.body;

  pool.query(
    'INSERT INTO recipes (title, description, category, cookTime, ingredients, instructions) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, category, cookTime, ingredients, instructions],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Recipe created successfully' });
    }
  );
});

router.get('/recipes', (req, res) => {

  pool.query('SELECT * FROM recipes', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});

router.get('/recipes/:id', (req, res) => {
  const recipeId = req.params.id;

  pool.query('SELECT * FROM recipes WHERE id = ?', [recipeId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(200).json(results[0]);
  });
});

router.put('/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  const { title, description, category, cookTime, ingredients, instructions } = req.body;


  pool.query(
    'UPDATE recipes SET title=?, description=?, category=?, cookTime=?, ingredients=?, instructions=? WHERE id=?',
    [title, description, category, cookTime, ingredients, instructions, recipeId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Recipe updated successfully' });
    }
  );
});

router.delete('/recipes/:id', (req, res) => {
  const recipeId = req.params.id;

  pool.query('DELETE FROM recipes WHERE id = ?', [recipeId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  });
});

module.exports = router;
