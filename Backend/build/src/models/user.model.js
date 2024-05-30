"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(googleId, displayName, email) {
        this.googleId = googleId;
        this.displayName = displayName;
        this.email = email;
    }
    getGoogleId() {
        return this.googleId;
    }
    setGoogleId(googleId) {
        this.googleId = googleId;
    }
    getDisplayName() {
        return this.displayName;
    }
    setDisplayName(displayName) {
        this.displayName = displayName;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
}
exports.default = User;
