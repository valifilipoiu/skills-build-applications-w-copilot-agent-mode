import express from 'express';
import { connectToDatabase } from './config/database.js';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';

const app = express();

app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl, service: 'octofit-backend' });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('members').populate('captain').lean();
  res.json(teams);
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json(activities);
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('user').populate('team').sort({ score: -1 }).lean();
  res.json(leaderboard);
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

export async function startServer() {
  await connectToDatabase();
  return app.listen(8000, () => {
    console.log(`OctoFit API listening on http://localhost:8000`);
  });
}

export default app;
