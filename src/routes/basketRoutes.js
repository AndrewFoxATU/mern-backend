const express = require('express');
const router = express.Router();
// Import the controller functions
const basketController = require('../controllers/basketController');

// Notice we just use '/' here, because we will mount this router on '/basket' later
router.get('/', basketController.viewBasket);
router.post('/', basketController.addToBasket);
router.delete('/:id', basketController.removeFromBasket);

module.exports = router;