// routes/inventory.js
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Get inventory status of uniforms
router.get('/status', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json({ message: 'Inventory fetched successfully', inventory });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error });
  }
});

// routes/inventory.js
// Update uniform inventory
router.post('/update', async (req, res) => {
    const { uniformType, size, quantityInStock } = req.body;
  
    try {
      let inventory = await Inventory.findOne({ uniformType, size });
      if (inventory) {
        inventory.quantityInStock += quantityInStock; // Add stock
        inventory.lastUpdated = Date.now();
      } else {
        inventory = new Inventory({ uniformType, size, quantityInStock });
      }
      await inventory.save();
      res.status(200).json({ message: 'Inventory updated successfully', inventory });
    } catch (error) {
      res.status(500).json({ message: 'Error updating inventory', error });
    }
  });
  
  module.exports = router;
  