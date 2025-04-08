import express from 'express';
import { createPlan, getUserPlans } from '../controllers/planController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createPlan);
router.get('/', getUserPlans);

export default router;
