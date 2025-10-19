import express from 'express'
import {updatePrice, allDriveType} from '../controllers/driveType.js'
import { checkAuth } from "../middlewares.js";

const router = express.Router();

router.patch('/:driveTypeId', checkAuth, updatePrice)
router.get('/allDriveType', allDriveType)

export default router;