import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// @desc    Get all tasks
// @route   GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving tasks', error: error.message });
  }
});

// @desc    Add a new task
// @route   POST /api/tasks OR /api/tasks/add
const addTask = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Task text is required' });
    }
    const newTask = new Task({ text });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error adding task', error: error.message });
  }
};
router.post('/', addTask);
router.post('/add', addTask);

// @desc    Update a task (mark completed or edit text)
// @route   PUT /api/tasks/:id OR /api/tasks/update/:id
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const updateData = {};
    if (text !== undefined) updateData.text = text;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating task', error: error.message });
  }
};
router.put('/:id', updateTask);
router.put('/update/:id', updateTask);

// @desc    Delete a task from DB
// @route   DELETE /api/tasks/:id OR /api/tasks/delete/:id
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting task', error: error.message });
  }
};
router.delete('/:id', deleteTask);
router.delete('/delete/:id', deleteTask);

export default router;
export { addTask, updateTask, deleteTask };
