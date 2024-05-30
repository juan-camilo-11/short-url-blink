"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
router.get('/profile', (req, res) => {
    if (req.user) {
        res.json({
            id: req.user.id,
            nombre: req.user.displayName,
            email: req.user.emails[0].value
        });
    }
    else {
        res.status(500).json("Internal server error");
    }
});
exports.default = router;
