const express = require('express');
const router = express.Router();
const Sport  = require('../models/sport');

// Get all sports
router.get('/', async (req, res) => {
    try {
        const sports = await Sport.find();
        if (sports.length === 0) {
            return res.status(404).json({ error: 'No sports found' });
        }
      return  res.status(200).json({ message: 'Sports retrieved successfully', sports });
    } catch (error) {
        console.error('Error retrieving sports:', error);
       return  res.status(500).json({ error: 'Could not retrieve sports' });
    }
});

// Get sport by name
router.get('/:name', async (req, res) => {
    try {  
        const sport = await Sport.findOne({ name:{$regex:`^${req.params.name.trim()}$`,$options:'i'}});
        if (!sport) {
            return res.status(404).json({ error: 'No such sport exists' });
        }
        res.status(200).json({ message: 'Sport found', sport });
    } catch (error) {
        console.error('Error retrieving sport:', error);
        return res.status(500).json({ error: 'Could not retrieve the sport' });
    }
});

// Delete sport by name
router.delete('/:name', async (req, res) => {
    try {
        const sport = await Sport.deleteOne({ name:{$regex:`^${req.params.name.trim()}$`,$options:'i'}});
        if (sport.deletedCount === 0) {
            return res.status(404).json({ error: 'No such sport exists' });
        }
        res.status(200).json({ message: 'Sport deleted successfully' });
    } catch (error) {
        console.error('Error deleting sport:', error);
       return res.status(500).json({ error: 'Could not delete the sport' });
    }
});

// Insert a new sport
router.post('/', async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'No fields provided in the request body' });
        }  
        
        const exist = await Sport.findOne({ name:{$regex:`^${req.body.name.trim()}$`,$options:'i'}});
        if (exist) {
            return res.status(400).json({ error: 'Sport already exists' });
        }   
        
        const newSport = new Sport({
            name: req.body.name,
           description:req.body.description
        });
        await newSport.save();
        return res.status(201).json({ message: 'Sport added successfully', newSport });
    } catch (error) {
        console.error('Error adding sport:', error);
        return res.status(500).json({ error: 'Could not add the sport' });
    }
});

module.exports = router;
