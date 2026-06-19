import express from 'express';
import Visitor from '../models/Visitors.js';

const router = express.Router();

// Register a Visitor (with basic validation rules)
router.post('/', async (req, res) => {
  const { name, phone, category, purpose } = req.body;

  if (!name || !phone || !category || !purpose) {
    return res.status(400).json({ message: 'All fields are mandatory' });
  }

  try {
    const newVisitor = new Visitor({ name, phone, category, purpose });
    await newVisitor.save();
    res.status(201).json(newVisitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get/Search Visitors (supports multiple criteria via query string: ?category= or ?status=)
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const visitors = await Visitor.find(filter).sort({ entryTime: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update status to 'Out' (Checkout)
router.patch('/:id/checkout', async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.訪問者id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    
    visitor.status = 'Out';
    await visitor.save();
    res.json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;