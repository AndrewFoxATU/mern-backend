const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet'); // New security import
const cors = require('cors');     // FIX: You forgot to require cors
require('dotenv').config();

const app = express();

// Security and Middleware
app.use(helmet());           // Protects against common web vulnerabilities
app.use(cors());             // Allows your mobile app to talk to this server [cite: 243]
app.use(express.json());      // Standard for receiving JSON data

// Environment Variables
const MONGO_URI = process.env.MONGO_URI; 
const PORT = process.env.PORT || 3000;

// Mongoose Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  description: { type: String }
});

const Product = mongoose.model('Product', productSchema);


// Routes
app.get('/api/status', (req, res) => {
  res.json({ 
    status: "Online",
    message: "AWS Backend is reachable!",
    owner: "Student Name", // Change this to your name!!!
    timestamp: new Date()
  });
});


// UPDATE a product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// DELETE a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted', product: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});



mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop the server if the password is wrong
  });