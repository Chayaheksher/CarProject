import express from "express";

import {
    signIn,
    signUp
} from "../controllers/sign.js";

const router = express.Router();

router.get('/:identity/:phone/:password', signIn);
router.post('/', signUp)

export default router