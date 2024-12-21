const express = require('express');
const Expense = require('../models/expenses');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // Attach user info to the request
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token' });
    }
  };
  

// Add an Expense
router.post('/add', verifyToken, async (req, res) => {
    console.log('Request Body:', req.body);
console.log('User ID:', req.user.id);

  try {
    console.log('Request Body:', req.body);
console.log('User ID:', req.user.id);

    const { amount, category, description } = req.body;
    const expense = new Expense({
      userId: req.user.id,
      amount,
      category,
      description,
    });
    await expense.save();
    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Expenses for a User
router.get('/', verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an Expense
router.delete('/:id', verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const deletedExpense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
  
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json({ message: 'Expense deleted successfully', expense: deletedExpense });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Update an Expense
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (expense.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;

    await expense.save();
    res.json({ message: 'Expense updated successfully', expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
