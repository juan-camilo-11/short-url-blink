"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/auth/google", passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: `${process.env.APP_URL_FRONTEND}/short-url-blink/error` }), function (req, res) {
    res.redirect(`${process.env.APP_URL_FRONTEND}/short-url-blink/`);
});
router.get('/auth/logout', (req, res) => {
    req.logout(() => {
        res.status(200).json('Closed session');
    });
});
exports.default = router;
