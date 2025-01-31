const express = require('express');
const router= express.Router();
const Police = require('../models/Police');

// POST route to add a person
// Save data
router.post('/', async (req, res) => {
    const body = req.body;
    const newData = new Police(body);
    try {
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
       res.status(400).json({ message: error.message });
    }
});

// Get all data
router.get('/data', async (req, res) => {
    try {
        const data = await Police.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


 // Delete data
router.delete('/:id', async (req, res) => {
    
    try {
        const {id} = req.params;
        const deletedData = await Police.findByIdAndDelete(id);
        if(!deletedData)
        {return res.status(404).json({ message: 'Data not found' })}
        
        res.status(200).json({ message: 'Data deleted successfully' });
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ err:"server error" });
    }
})

// Update data
router.put('/:id', async (req, res) => {
  
  try {
    
    if(!req.body){
        return res.status(400).json({ message: 'Please enter data' });
    }
      const updatedData = await Police.findByIdAndUpdate(req.params.id,req.body, { new: true });
    if (!updatedData) {
        return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json(updatedData);
      
    }catch(err){
      console.error(err);
      res.status(500).json('Server error');
  }
});

module.exports = router;