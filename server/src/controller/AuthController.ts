import { Router } from "express";
import AsyncWrap from "./AsyncWrap";
import LoginHandler from '../handlers/Login';

const router = Router();
router.post("/login", AsyncWrap(LoginHandler));

export default router;