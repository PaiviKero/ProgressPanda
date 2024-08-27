"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goalController_1 = __importDefault(require("../controllers/goalController"));
const router = (0, express_1.Router)();
router.get('/', goalController_1.default.getAllGoals);
router.get('/:id', goalController_1.default.getGoalById);
exports.default = router;
