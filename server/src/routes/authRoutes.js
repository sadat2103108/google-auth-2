import express from 'express';

import {loginSuccess, loginFailed, googleCallback,googleLogin,logout} from '../controllers/authControllers.js';
const router = express.Router();

router.get("/login/success", loginSuccess);
router.get("/login/failed", loginFailed);
router.get("/google/callback", googleCallback);
router.get("/google", googleLogin);
router.get("/logout", logout);

export default router;
