"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
}, { timestamps: true });
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
