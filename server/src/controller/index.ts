import { Router } from "express";
import auth from "./AuthController";

const router = Router();
router.use("/auth", auth);

export default router;