import express from 'express'
import { allBorrows ,borrowsById, returnDate } from '../controllers/displayBorrows.js';
import { checkAuth } from "../middlewares.js";

const router = express.Router();

router.get('/', checkAuth,allBorrows)
router.get('/:userId', borrowsById)
router.get('/returnDate/:borrowId', returnDate)

export default router;