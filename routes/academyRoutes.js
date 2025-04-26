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
        return res.status(500).json({ error: 'Could not retrieve academies' });
    }
});

// Get academy by name
router.get('/:name', async (req, res) => {
    try {  

        const academy = await Academy.findOne({ name:{$regex:`^${req.params.name.trim()}$`,$options:'i'}});
        if (!academy) {
            return res.status(404).json({ error: 'No such academy exists' });
        }
        return res.status(200).json({ message: 'Academy found', academy });
    } catch (error) {
        console.error('Error retrieving academy:', error);
        return res.status(500).json({ error: 'Could not retrieve academy' });
    }
});

// Delete academy by name
router.delete('/:name', async (req, res) => {
    try {
        const deletedAcademy = await Academy.findOneAndDelete({ name: {$regex:`^${req.params.name.trim()}$`,$options:'i'}});
        if (!deletedAcademy) {
            return res.status(404).json({ error: 'No such academy exists' });
        }
        return res.status(200).json({ message: 'Academy deleted successfully', deletedAcademy });
    } catch (error) {
        console.error('Error deleting academy:', error);
        return res.status(500).json({ error: 'Could not delete academy' });
    }
});

// Insert academy
router.post('/', async (req, res) => {
    try {
        const existingAcademy = await Academy.findOne({ name: {$regex:`^${req.body.name.trim()}$`,$options:'i'}, 
        location: {$regex:`^${req.body.location.trim()}$`,$options:'i'} 
    });
        if (existingAcademy) {
            return res.status(400).json({ error: 'Academy already exists' });
        }

        const newAcademy = new Academy({
            name: req.body.name.trim().toLowerCase(),
            location: req.body.location,
            sportsOffered: req.body.sportsOffered,
            contact: req.body.contact
        });

        const savedAcademy = await newAcademy.save();
        return res.status(201).json({ message: 'Academy has been added', savedAcademy });
    } catch (error) {
        console.error('Error inserting academy:', error);
        return  res.status(500).json({ error: 'Could not insert academy' });
    }
});
module.exports=router; 