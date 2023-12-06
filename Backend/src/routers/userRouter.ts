import express from "express"
import * as UserController from "../controller/user"
const router = express.Router();
router.post('/api/users/signup',UserController.signUp);

export default router;
