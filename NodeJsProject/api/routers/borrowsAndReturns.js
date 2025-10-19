import express from 'express'
import {addBorrow, returnBorrow} from '../controllers/borrowsAndReturns.js'
import { checkAuth } from "../middlewares.js";

const router = express.Router();

router.post('/',checkAuth, addBorrow)
router.post('/return',checkAuth, returnBorrow)

export default router;