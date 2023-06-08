const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Seller = require('../models/Seller');

// GET signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// POST signup form
router.post('/signup', async (req, res) => {
  try {
    const { email, businessName, password, confirmPassword } = req.body;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new seller
    const seller = new Seller({
      email,
      businessName,
      password: hashedPassword,
    });

    // Save the seller to the database
    await seller.save();

    // Redirect to the seller's dashboard
    res.redirect(`/seller/${seller._id}/dashboard`);
  } catch (error) {
    res.render('signup', { error: error.message });
  }
});

module.exports = router;
