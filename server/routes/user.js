import express from "express";
import { signup, signin, findAll } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/findAll", findAll);

export default router;