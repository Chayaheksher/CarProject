import express from 'express'
import { getCars, deleteCar, addCar, updateCarDetails, allCarTypes } from '../controllers/displayCars.js';
import { deleteMiddlware, checkAuth, upload } from "../middlewares.js";

const router = express.Router();

router.get('/', getCars)
router.delete('/:carId',checkAuth,deleteMiddlware, deleteCar)
router.post('/',checkAuth,upload.single('image'), addCar);
router.patch('/:carId',checkAuth,upload.single('image'), updateCarDetails)
router.get('/allCarTypes', allCarTypes)


export default router;
