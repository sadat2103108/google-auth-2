import dotenv from 'dotenv';
dotenv.config();

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/auth/google/callback",
            scope: ["profile","email"],
        },
        function (accessToken,refreshToken,profile,callback){
            callback(null,profile);
        }
    )
);

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});

export default passport;
