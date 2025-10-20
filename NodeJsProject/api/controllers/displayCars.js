import Car from '../models/car.js';
import CarModels from '../models/carModels.js';
import CarTypes from '../models/carTypes.js';
import DriveType from '../models/driveType.js';

export const getCars = (req, res) => {
    const { filterType, params } = req.query;
    console.log(filterType, params);
    const type = Number(filterType);
    const allCars = Car.find()
        .populate([
            { 
                path: 'carModelsId', 
                select: 'company model', 
                populate: { path: 'carTypesId' } 
            },
            { path: 'driveTypesId' }
        ])
        .then(c => {
            let filteredCars = [];

            switch (type) {
                case 0:
                    filteredCars = c.filter(car => {
                        const carFullDescription = `${car.carModelsId.model} ${car.carModelsId.company}`.toLowerCase();
                        console.log(params, "??????????????????????????")
                        return carFullDescription.includes(params.toLowerCase()) && car.isAvailable === true;
                    });
                    break;
                case 1:
                    filteredCars = c.filter(car => 
                        car.driveTypesId.description.toLowerCase().includes(params.toLowerCase()) && 
                        car.isAvailable === true
                    );
                    break;
                case 2:
                    filteredCars = c.filter(car => 
                        car.carModelsId.carTypesId.description.toLowerCase().includes(params.toLowerCase()) && 
                        car.isAvailable === true
                    );
                    break;
                case 3:
                    const param = Number(params);
                    filteredCars = c.filter(car => 
                        car.numberOfSeats === param && 
                        car.isAvailable === true
                    );
                    break;
                case 4:
                    filteredCars = c.filter(car => 
                        car.city.toLowerCase().includes(params.toLowerCase()) && 
                        car.isAvailable === true
                    );
                    break; 
                default:
                    filteredCars = c;
                    break;
            }
            res.status(200).send({ c: filteredCars });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};


export const addCar = (req, res) => {

    const { licenseNumber, carModelsId, numberOfSeats, image, year, isGears, driveTypesId, 
        pricePerHour, needPerKm, balanceInLiters, street, city, isAvailable } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : ""; // שמירת כתובת התמונה
    const newCar = new Car({
        licenseNumber,
        carModelsId,
        numberOfSeats,
        image:imageUrl,
        year,
        isGears,
        driveTypesId,
        pricePerHour,
        needPerKm,
        balanceInLiters,
        street,
        city,
        isAvailable:true
    });
    newCar.save()
    .then(c => {
        res.status(200).send(c);
    })
    .catch(error=>{
        res.status(500).send({message: error.message})
    })
}

export const deleteCar = (req, res) => {
    const {carId} = req.params
    Car.findByIdAndDelete(carId)
    .then(c => {
        res.status(200).send({message:  `delete car ${c} succeed!` })
    })
    .catch(error => {
        res.status(500).send({error: error.message})
    })
}


export const updateCarDetails = (req, res) => {
    const { carId } = req.params;
    const { numberOfSeats, pricePerHour, balanceInLiters, street, city, isAvailable } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : ""; 

    const updateData = {
        numberOfSeats,
        pricePerHour,
        balanceInLiters,
        street,
        city,
        isAvailable
    };

    if (imageUrl) {
        updateData.image = imageUrl;
    }

    Car.findByIdAndUpdate(carId, updateData, { new: true })
        .then(c => {
            if (!c) {
                return res.status(404).send({ message: `Car with ID ${carId} not found` });
            }
            res.status(200).send({ message: `Update car ${c._id} succeed!`, c });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
};


export const allCarTypes = (req, res) => {
    CarTypes.find()
    .then(ct=>{
        res.status(200).send(ct)
    })
    .catch(error=>{
        res.status(500).send({message: error.message})
    })
}
