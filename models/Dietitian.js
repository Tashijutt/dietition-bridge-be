import mongoose from 'mongoose';

const dietitianSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: String,
  expertise: [String],
  availableDays: [String]
}, { timestamps: true });

export default mongoose.model('Dietitian', dietitianSchema);
