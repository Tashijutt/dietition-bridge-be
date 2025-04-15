import Dietitian from '../models/Dietitian.js';
import User from '../models/User.js';

export const createDietitianProfile = async (req, res) => {
  try {
    const existing = await Dietitian.findOne({ user: req.user.id });
    if (existing) return res.status(400).json({ message: 'Profile already exists' });

    const profile = await Dietitian.create({ ...req.body, user: req.user.id });
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Dietitian.findOne({ user: req.user.id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllDietitians = async (req, res) => {
  try {
    const dietitians = await User.find({ role: 'dietitian' });
    res.json(dietitians);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};