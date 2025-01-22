import express from 'express';
import passport from "passport";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();


router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "successfully logged in",
            user: req.user,
        })

    } else {
        res.status(403).json({
            error: true,
            message: "not authorized",
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "login failure",
    });
});

router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/api/auth/login/failed",
    })
);


router.get('/google', passport.authenticate('google', {
    scope: ["profile", "email"],
    prompt: 'consent', // Forces the user to reselect their account
}));


router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(process.env.CLIENT_URL);
    });
});

export default router;
