
const express = require('express');
const router = express.Router();
const { Group } = require('../models/group');

// Get all groups
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        return res.status(200).json({ message: 'Groups retrieved successfully', groups });
    } catch (error) {
        console.error('Error retrieving groups:', error);
        return res.status(500).json({ error: 'Could not retrieve groups' });
    }
});

// Get group by name
router.get('/:name', async (req, res) => {
    try {
        const group = await Group.findOne({ name: { $regex: `^${req.params.name}$`, $options: 'i' } });
        if (!group) {
            return res.status(404).json({ error: 'No such group exists' });
        }
        return res.json({ message: 'Group found', group });
    } catch (error) {
        console.error('Error retrieving group:', error);
        return res.status(500).json({ error: 'Could not retrieve the group' });
    }
});

// Insert a new group
router.post('/', async (req, res) => {
    try {
        const newGroup = new Group(req.body);
        const savedGroup = await newGroup.save();
        return res.status(201).json({ message: 'Group created successfully', savedGroup });
    } catch (error) {
        console.error('Error creating group:', error);
        return  res.status(500).json({ error: 'Could not create the group' });
    }
});

// Delete group by name
router.delete('/:name', async (req, res) => {
    try {
        const deletedGroup = await Group.findOneAndDelete({ name: { $regex: `^${req.params.name}$`, $options: 'i' } });
        if (!deletedGroup) {
            return res.status(404).json({ error: 'Group does not exist' });
        }
        return res.json({ message: 'Group deleted successfully', deletedGroup });
    } catch (error) {
        console.error('Error deleting group:', error);
        return res.status(500).json({ error: 'Could not delete the group' });
    }
});

module.exports = router;
