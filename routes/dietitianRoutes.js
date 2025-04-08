import express from 'express';
import { createDietitianProfile, getMyProfile } from '../controllers/dietitianController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorizeRoles('dietitian'));

router.post('/', createDietitianProfile);
router.get('/me', getMyProfile);

export default router;
