//משותף לשתיהם
import Car from '../models/car.js';
import CarModels from '../models/carModels.js';
import CarTypes from '../models/carTypes.js';
import DriveType from '../models/driveType.js';

// הצגת כל הרכבים עם אפשרויות הסינון
//לבדוק כי לכאורה הכי טוב לעשות הסינון בריאקט
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
                    filteredCars = c; // במקרה שאין סינון, כל המכוניות
                    break;
            }
            // מחזיר תמיד את c או filteredCars
            res.status(200).send({ c: filteredCars });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};



//הוספת רכב
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
//מחיקת רכב
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

//עדכון פרטי רכב
// export const updateCarDetails = (req, res) => {
//     const {carId} = req.params
//     const { numberOfSeats, image, pricePerHour, balanceInLiters, street, city, isAvailable } = req.body;

//     Car.findByIdAndUpdate(carId, req.body, {new:true})
//     .then(c => {
//         res.status(200).send({ message: `update car ${c._id} succeed!`, c })
//     })
//     .catch(error => {
//         res.status(500).send({message: error.message})
//     })
// }
// עדכון פרטי רכב
export const updateCarDetails = (req, res) => {
    const { carId } = req.params;
    const { numberOfSeats, pricePerHour, balanceInLiters, street, city, isAvailable } = req.body;

    // אם יש קובץ בתגובה, נעדכן את כתובת התמונה
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : ""; // שמירת כתובת התמונה

    // הכנת אובייקט העדכון
    const updateData = {
        numberOfSeats,
        pricePerHour,
        balanceInLiters,
        street,
        city,
        isAvailable
    };

    // אם יש כתובת תמונה, נוסיף אותה לאובייקט העדכון
    if (imageUrl) {
        updateData.image = imageUrl;
    }

    // עדכון הרכב בבסיס הנתונים
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


//שליפת כל סוגי רכב
export const allCarTypes = (req, res) => {
    CarTypes.find()
    .then(ct=>{
        res.status(200).send(ct)
    })
    .catch(error=>{
        res.status(500).send({message: error.message})
    })
}
















//סינון רכבים תוך כדי שליפה
// export const filterCars = async (req, res) => {

//     const { filterType, params } = req.query

//     console.log("Params:", params);
//     const type = Number(filterType)
//     console.log("num: ", type);
//     switch (type) {
//         case 1:
//             Car.find({ 'carModelsId.model': { $eq: params } })
//             .populate([
//                 { 
//                   path: 'carModelsId', 
//                   select: 'company model', 
//                   populate: { path: 'carTypesId' } 
//                 },
//                 { path: 'driveTypesId' }
//             ])
//             .then(c => {
//                 console.log(c); // בדיקה אם נמצאו תוצאות
//                 res.status(200).send({ c });
//             })
//             .catch(error => {
//                 res.status(500).send({ error: error.message });
//             });        
//             break;
//         case 2:
//             // execute case y code block
//             break;
//         case 3:
//             // execute case y code block
//             break;
//         case 4:
//             //jnk
//             break;
//         case 5:
//             //nkjnn
//             break;
//         default:
//        res.status(400).send({ message: "Invalid filter type" });
//     }
// }


// export const filterCars = async (req, res) => {
//     const { filterType, params } = req.query

//     console.log("Params:", params);
//     const type = Number(filterType)
//     console.log("num: ", type);

//     try {
//         switch (type) {
//             case 1:
//                 const result = await Car.find({ 'carModelsId.model': { $eq: params } })
//                     .populate([
//                         { 
//                           path: 'carModelsId', 
//                           select: 'company model', 
//                           populate: { path: 'carTypesId' } 
//                         },
//                         { path: 'driveTypesId' }
//                     ]).exec();

//                 console.log(result); // בדיקה אם נמצאו תוצאות
//                 res.status(200).send({ result });
//                 break;
//             case 2:
//                 // execute case y code block
//                 break;
//             case 3:
//                 // execute case y code block
//                 break;
//             case 4:
//                 //jnk
//                 break;
//             case 5:
//                 //nkjnn
//                 break;
//             default:
//                 res.status(400).send({ message: "Invalid filter type" });
//         }
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// }



// export const filterCars = async (req, res) => {
//     const { filterType, params } = req.query

//     const carModel = await carModels.findOne({ model: params }).exec();
//     if (carModel) {
//         const cars = await Car.find({ carModelsId: carModel._id }).exec();
    
//         console.log("Cars Found without populate:", cars);
//         const populatedCars = await Car.populate(cars, [
//             { 
//               path: 'carModelsId', 
//               select: 'company model', 
//               populate: { path: 'carTypesId' } 
//             },
//             { path: 'driveTypesId' }
//         ]);
    
//         console.log("Cars Found with populate:", populatedCars);
//         res.status(200).send({ populatedCars });
//     } else {
//         console.log("Car model not found for params:", params);
//         res.status(404).send({ message: "Car model not found" });
//     }
// }