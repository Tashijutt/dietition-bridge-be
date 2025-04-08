import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meals: [{ type: String }],
  notes: String
}, { timestamps: true });

export default mongoose.model('Plan', planSchema);
