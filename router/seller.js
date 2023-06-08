const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

// GET seller dashboard
router.get('/:sellerId/dashboard', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);

    // Render the seller's dashboard
    res.render('dashboard', { seller });
  } catch (error) {
    res.status(404).send('Seller not found');
  }
});

module.exports



