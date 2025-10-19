import express from 'express'
// import {addModel, allModels} from '../controllers/carModels.js'
import { allModels ,addModel } from '../controllers/carModels.js';
import { checkAuth } from "../middlewares.js";

const router = express.Router();

router.get('/', allModels)
router.post('/',checkAuth, addModel)

export default router;