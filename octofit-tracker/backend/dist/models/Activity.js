"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: ['run', 'walk', 'lift', 'cycle', 'yoga', 'hiit'],
        required: true,
    },
    durationMinutes: { type: Number, min: 5, required: true },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
