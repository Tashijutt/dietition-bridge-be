import Plan from '../models/Plan.js';

export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create({ ...req.body, user: req.user.id });
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user.id });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
