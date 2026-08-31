import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava@octofit.com',
        passwordHash: 'hash_ava',
        goals: ['Run 5k', 'Improve strength'],
        streak: 18,
      },
      {
        name: 'Noah Patel',
        email: 'noah@octofit.com',
        passwordHash: 'hash_noah',
        goals: ['Cycle 100km', 'Mobility'],
        streak: 12,
      },
      {
        name: 'Mila Nguyen',
        email: 'mila@octofit.com',
        passwordHash: 'hash_mila',
        goals: ['Lift more', 'Recovery'],
        streak: 9,
      },
    ]);

    const teamOne = await Team.create({
      name: 'Storm Squad',
      description: 'A high-energy cross-training crew.',
      captain: users[0]._id,
      members: users.map((user) => user._id),
    });

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 45,
        caloriesBurned: 520,
        date: new Date(),
      },
      {
        user: users[1]._id,
        type: 'cycle',
        durationMinutes: 60,
        caloriesBurned: 640,
        date: new Date(),
      },
      {
        user: users[2]._id,
        type: 'lift',
        durationMinutes: 50,
        caloriesBurned: 480,
        date: new Date(),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teamOne._id, score: 9450, rank: 1 },
      { user: users[1]._id, team: teamOne._id, score: 8750, rank: 2 },
      { user: users[2]._id, team: teamOne._id, score: 8120, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Power Sprint Circuit',
        category: 'hiit',
        difficulty: 'advanced',
        durationMinutes: 30,
        focusAreas: ['legs', 'core', 'conditioning'],
        recommendedFor: ['competitive', 'intermediate'],
      },
      {
        title: 'Endurance Recovery Ride',
        category: 'cardio',
        difficulty: 'beginner',
        durationMinutes: 40,
        focusAreas: ['cardio', 'stamina'],
        recommendedFor: ['beginner', 'recovery'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
