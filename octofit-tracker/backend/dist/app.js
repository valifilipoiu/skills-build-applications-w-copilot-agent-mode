"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = getApiBaseUrl;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const database_js_1 = require("./config/database.js");
const Activity_js_1 = require("./models/Activity.js");
const Leaderboard_js_1 = require("./models/Leaderboard.js");
const Team_js_1 = require("./models/Team.js");
const User_js_1 = require("./models/User.js");
const Workout_js_1 = require("./models/Workout.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
}
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl: getApiBaseUrl(), service: 'octofit-backend' });
});
app.get('/api/users', async (_req, res) => {
    const users = await User_js_1.User.find().lean();
    res.json(users);
});
app.get('/api/teams', async (_req, res) => {
    const teams = await Team_js_1.Team.find().populate('members').populate('captain').lean();
    res.json(teams);
});
app.get('/api/activities', async (_req, res) => {
    const activities = await Activity_js_1.Activity.find().populate('user').lean();
    res.json(activities);
});
app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await Leaderboard_js_1.Leaderboard.find().populate('user').populate('team').sort({ score: -1 }).lean();
    res.json(leaderboard);
});
app.get('/api/workouts', async (_req, res) => {
    const workouts = await Workout_js_1.Workout.find().lean();
    res.json(workouts);
});
async function startServer() {
    const port = Number(process.env.PORT || 8000);
    const host = process.env.HOST || '0.0.0.0';
    await (0, database_js_1.connectToDatabase)();
    return app.listen(port, host, () => {
        console.log(`OctoFit API listening on http://${host}:${port}`);
    });
}
exports.default = app;
