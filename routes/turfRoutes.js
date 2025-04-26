const express=require('express'); 
const router=express.Router() ;
const Turf=require('../models/turf');    

// Update turf by name
router.put('/name/:name', async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'No fields provided for update' });
        }
        if (req.body.location) {
            req.body.location = req.body.location.trim().toLowerCase(); 
        } 
        if(req.body.name)
        {
            req.body.name=req.body.name.trim().toLowerCase(); 
        }
        const updatedTurf = await Turf.findOneAndUpdate(
            { name: req.params.name }, 
            { $set: req.body },
            { new: true }
        );
        if (!updatedTurf) {
            return res.status(404).json({ error: 'No such turf found' });
        }
        res.json({ message: 'Turf updated successfully', updatedTurf });
    } catch (error) {
        console.error('Error updating turf:', error);
        return res.status(500).json({ error: 'Could not update the turf' });
    }
});

// Insert a new turf
router.post('/', async (req, res) => {
    try {  
         const{name,location}=req.body;  
         const existingturf=await Turf.findOne({name,location});
         if(existingturf)  
         {
            return res.status(409).json({message:'This turf already exists for this location'}); 
         }
        // const newTurf = new Turf(req.body); 
        // const savedTurf = await newTurf.save();
        const turfData = req.body;
        turfData.location = turfData.location.trim().toLowerCase(); 
         turfData.name=turfData.name.trim().toLowerCase();
        const newTurf = new Turf(turfData);
        const savedTurf=await newTurf.save();
        return res.status(201).json({ message: 'Turf created successfully', savedTurf }); 
    } catch (error) {
        console.error('Error creating turf:', error);
       return  res.status(500).json({ error: 'Could not create the turf' });
    }
});

// Delete turf by name
router.delete('/:name', async (req, res) => {
    try {
        const deletedTurf = await Turf.findOneAndDelete({ name: req.params.name });
        if (!deletedTurf) {
            return res.status(404).json({ error: 'Turf does not exist' });
        }
        res.json({ message: 'Turf deleted successfully', deletedTurf });
    } catch (error) {
        console.error('Error deleting turf:', error);
        return res.status(500).json({ error: 'Could not delete the turf' });
    }
});

// Get turf by name
router.get('/:name', async (req, res) => {
    try {
        const turf = await Turf.findOne({ name: req.params.name });
        if (!turf) {
            return res.status(404).json({ error: 'No such turf exists' });
        }
        return res.json({ message: 'Turf found', turf });
    } catch (error) {
        console.error('Error retrieving turf:', error);
        return res.status(500).json({ error: 'Could not retrieve the turf' });
    }
}); 

router.get('/location/:location',async(req,res)=>{  
      try 
      {  
        const location =req.params.location.trim(); 
        const turf = await Turf.find({
            location: { $regex: `^${location}$`, $options: 'i' }
          }); 
          if(!turf ||turf.length===0) 
          {
            return res.status(404).json({error:'No turves exist for this location'}) ; 
          }  
        return res.json({message:'Turves found for this location',turf}); 
      } 
      catch(error) 
      {
        console.error('Error retrieving the turf:',error); 
        return res.status(500).json({error:'could not retrieve the turf'});
      }
});

module.exports = router;