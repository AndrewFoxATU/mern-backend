const Basket = require('../models/Basket');

// READ all basket items
exports.viewBasket = async (req, res) => {
  try {
    const basket = await Basket.find();
    res.json(basket);
  } catch (err) {
    res.status(500).json({ message: "Error fetching basket" });
  }
};

// CREATE a new basket item
exports.addToBasket = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const newBasketItem = await Basket.create({ product, quantity });
    res.status(201).json({ message: 'Product added successfully!', product: newBasketItem });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
};

// DELETE a basket item
exports.removeFromBasket = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Basket.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Basket item not found' });
    }
    res.json({ message: 'Basket item deleted', basket: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting basket item', error: err.message });
  }
};