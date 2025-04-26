const express=require('express'); 
const router=express.Router();  
const Academy=require('../models/academy');  
 
router.get('/', async (req, res) => {
    try {
        const academies = await Academy.find();
        if (!academies.length) {
            return res.status(404).json({ error: 'No academies found' });
        }
        res.status(200).json({ message: 'Academies found', academies });
    } catch (error) {
        console.error('Error retrieving academies:', error);
        res.status(500).json({ error: 'Could not retrieve academies' });
    }
});

// Get academy by name
router.get('/:name', async (req, res) => {
    try {
        const academy = await Academy.findOne({ name: req.params.name });
        if (!academy) {
            return res.status(404).json({ error: 'No such academy exists' });
        }
        res.status(200).json({ message: 'Academy found', academy });
    } catch (error) {
        console.error('Error retrieving academy:', error);
        res.status(500).json({ error: 'Could not retrieve academy' });
    }
});

// Delete academy by name
router.delete('/:name', async (req, res) => {
    try {
        const deletedAcademy = await Academy.findOneAndDelete({ name: req.params.name });
        if (!deletedAcademy) {
            return res.status(404).json({ error: 'No such academy exists' });
        }
        res.status(200).json({ message: 'Academy deleted successfully', deletedAcademy });
    } catch (error) {
        console.error('Error deleting academy:', error);
        res.status(500).json({ error: 'Could not delete academy' });
    }
});

// Insert academy
router.post('/', async (req, res) => {
    try {
        const existingAcademy = await Academy.findOne({ name: req.body.name });
        if (existingAcademy) {
            return res.status(400).json({ error: 'Academy already exists' });
        }

        const newAcademy = new Academy({
            name: req.body.name,
            location: req.body.location,
            sportsOffered: req.body.sportsOffered,
            contact: req.body.contact,
            images: req.body.images
        });

        const savedAcademy = await newAcademy.save();
        res.status(201).json({ message: 'Academy has been added', savedAcademy });
    } catch (error) {
        console.error('Error inserting academy:', error);
        res.status(500).json({ error: 'Could not insert academy' });
    }
});
module.exports=router; 