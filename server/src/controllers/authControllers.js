import dotenv from 'dotenv';
import passport from 'passport';
dotenv.config();

// Login success controller
export const loginSuccess = (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully logged in",
            user: req.user,
        });
    } else {
        res.status(403).json({
            error: true,
            message: "Not authorized",
        });
    }
};

// Login failed controller
export const loginFailed = (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login failure",
    });
};

// Google callback controller
export const googleCallback = passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/api/auth/login/failed",
});

// Google login controller
export const googleLogin = passport.authenticate('google', {
    scope: ["profile", "email"],
    prompt: 'consent', // Forces the user to reselect their account
});

// Logout controller
export const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(process.env.CLIENT_URL);
    });
};
