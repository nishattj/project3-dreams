const express = require('express');
const router = express.Router();
const { getDB } = require('../config/db');  

router.get('/', async (req, res) => {
  const moodFilter = req.query.mood || '';  
  console.log('Selected Mood:', moodFilter); 

  try {
    const db = getDB();
    const dreamsQuery = moodFilter ? { mood: moodFilter } : {}; 
    console.log('Dreams Query:', dreamsQuery);  

    const dreams = await db.collection('dreams').find(dreamsQuery).sort({ createdAt: -1 }).toArray();

    const lastDream = dreams[0]; 

    res.render('index', { dreams, selectedMood: moodFilter, lastDream });

  } catch (err) {
    console.error('Error fetching dreams:', err);
    res.render('index', { dreams: [], error: 'Could not load dreams' });
  }
});

router.post('/dreams/add', async (req, res) => {
  const { title, description, mood } = req.body;
  const createdAt = new Date();

  try {
    const db = getDB();

    await db.collection('dreams').insertOne({
      title,
      description,
      mood,
      createdAt,
    });

    res.redirect('/'); 
  } catch (e) {
    console.log('An error occurred', e);
  }
});

module.exports = router;