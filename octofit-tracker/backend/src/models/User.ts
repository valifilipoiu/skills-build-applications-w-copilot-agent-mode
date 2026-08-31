import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    goals: { type: [String], default: [] },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
