import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'walk', 'lift', 'cycle', 'yoga', 'hiit'],
      required: true,
    },
    durationMinutes: { type: Number, min: 5, required: true },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = model('Activity', activitySchema);
