import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['strength', 'cardio', 'mobility', 'recovery', 'hiit'],
      required: true,
    },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, min: 10, required: true },
    focusAreas: { type: [String], default: [] },
    recommendedFor: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);
