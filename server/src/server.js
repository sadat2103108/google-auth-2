import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import authRoute from './routes/authRoutes.js';

import "./config/passportConfig.js";

dotenv.config();
const app = express();


app.use(
    session({
        secret: process.env.SESSION_SECRET, // Replace with a strong secret
        resave: false, // Prevent session being saved back to the store if not modified
        saveUninitialized: false, // Only save new sessions if they contain data
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session()); 


app.use(
    cors({
        origin:"http://localhost:3000",
        methods:"GET,POST,PUT,DELETE",
        credentials:true,
    })
)

app.use('/api/auth',authRoute);


const port = process.env.PORT || 8080;
// const port = 8080;

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}....`);
});