import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    ).select('-password'); // Exclude password from response
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// fetch a single user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// upload profile picture
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.params.id;
    const profilePicture = req.file.path.replace(/\\/g, '/'); // Convert Windows path to URL format

    // Find user and update profile picture
    const user = await User.findById(userId);
    if (!user) {
      // Delete uploaded file if user not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete old profile picture if it exists
    if (user.profilePicture) {
      const oldPath = path.join(process.cwd(), user.profilePicture);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Update user's profile picture
    user.profilePicture = profilePicture;
    await user.save();

    res.json({
      message: 'Profile picture uploaded successfully',
      profilePicture: user.profilePicture
    });
  } catch (err) {
    // Delete uploaded file if there's an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Error uploading profile picture', error: err.message });
  }
};

