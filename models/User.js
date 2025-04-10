import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'dietitian', 'admin'], default: 'user' },
  profilePicture: { type: String, default: '' },
  phone: { type: String, default: '' },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
  age: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  healthConditions: { type: [String], default: [] },
  dietaryPreferences: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
