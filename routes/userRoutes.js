import express from 'express';
import { upload } from '../components/upload.js';
import { getAllUsers, updateUser, deleteUser, getUser, uploadProfilePicture } from '../controllers/userController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

//router.use(protect, authorizeRoles('admin'));

// Admin only routes
router.get('/', protect, authorizeRoles('admin'), getAllUsers);
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);

// Routes for all authenticated users
router.put('/:id', protect, updateUser);
router.get('/:id', protect, getUser);
//router.post('/:id/profile-picture', protect, uploadProfilePicture);

// Use multer middleware in the route
router.post('/:id/profile-picture', upload.single('profilePicture'), uploadProfilePicture);

// router.get('/', getAllUsers);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;