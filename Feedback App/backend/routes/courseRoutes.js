const express = require('express');
const courseModel = require('../model/courseData'); 
const router = express.Router();

router.get('/feedback', async (req, res) => {
  try {
    const feedback = await courseModel.find();
    res.status(200).json(feedback);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching feedbacks' });
  }
});

router.post('/addfeedback', async (req, res) => {
  const { name, comments, rating } = req.body;

  try {
    const newFeedback = new courseModel({ name, comments,rating });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: 'Error creating feedback' });
  }
});

router.put('/updatefeedback/:id', async (req, res) => {
  const { name, comments,rating } = req.body;

  try {
    const updatedFeedback = await courseModel.findByIdAndUpdate(
      req.params.id,
      { name, comments,rating },
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'feedback not found' });
    }
    res.status(200).json({ message: 'feedback updated successfully', updatedFeedback });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error during update' });
  }
});

router.delete('/deletefeedback/:id', async (req, res) => {
  try {
    const deletedFeedback = await courseModel.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'feedback not found' });
    }
    res.status(200).json({ message: 'feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting feedback' });
  }
});

module.exports = router;