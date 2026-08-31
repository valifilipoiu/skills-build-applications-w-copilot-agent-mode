import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);
