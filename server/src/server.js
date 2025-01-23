import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import authRoute from './routes/authRoutes.js';

import "./config/passportConfig.js";

dotenv.config();
const app = express();
const LOGIN_SESSION_TIMEOUT = 24*60*60 ; //in seconds , GIVEN:1 DAY

app.use(
    session({
        secret: process.env.SESSION_SECRET, // Replace with a strong secret
        resave: false, // Prevent session being saved back to the store if not modified
        saveUninitialized: false, // Only save new sessions if they contain data
        cookie: {
            maxAge: LOGIN_SESSION_TIMEOUT * 1000, //in miliseconds
            httpOnly: true,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());


app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true, // Allow cookies to be sent
    })
);
app.use('/api/auth', authRoute);


const port = process.env.PORT || 8080;
// const port = 8080;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}....`);
});