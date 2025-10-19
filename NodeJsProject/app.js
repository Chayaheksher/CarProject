import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UsersType from './api/models/usersType.js';
import Users from './api/models/users.js';
import signRouter from './api/routers/sign.js';
import displatCarsRouter from './api/routers/displayCars.js';
import borrowsAndReturnsRouter from './api/routers/borrowsAndReturns.js';
import displayBorrowsRouter from './api/routers/displayBorrows.js';
import CarModelsRouter from './api/routers/carModels.js';
import DriveTypeRouter from './api/routers/driveType.js'; 
import CarTypes from './api/models/carTypes.js';
import DriveTypes from './api/models/driveType.js';
import CarModels from './api/models/carModels.js';
import Car from './api/models/car.js';
import cors from 'cors';



const app = express();
const PORT = 3030;
dotenv.config();

const corsOptions = {
  origin: ['http://localhost:3030', 'http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200 // חלק מהדפדפנים הישנים תומכים רק ב-200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

app.use('/sign', signRouter);
app.use('/displayCars', displatCarsRouter);
app.use('/borrowsAndReturns', borrowsAndReturnsRouter)
app.use('/displayBorrows', displayBorrowsRouter)
app.use('/carModels', CarModelsRouter)
app.use('/driveType', DriveTypeRouter)

console.log(process.env.URI)
// const uri = 'mongodb+srv://itaheksher:<MCg6j0QAJ08NJnzM>@cluster.gx4q8.mongodb.net/';
mongoose.connect(process.env.URI)
    .then(() => {
        console.log('connect to mongoDB');
    })
    .catch(err => {
        console.log({ error: err.message });
    })
    
console.log('Hello, Node.js!');

app.get('/', (req, res) => {
    res.send('my node.js project 😊❤️😍');
});

// יצירת מסמכים לדוגמה
// const userTypes = [
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "מנהל"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "משתמש"
//     }
// ];

// שמירת המסמכים ב-Collection
// UsersType.insertMany(userTypes)
//     .then(() => {
//         console.log('UsersType data added successfully!');
//         mongoose.connection.close(); // סגירת החיבור לאחר שמירה
//     })
//     .catch(err => {
//         console.error('Error adding UsersType data:', err);
//         mongoose.connection.close(); // סגירת החיבור במקרה של שגיאה
//     });

// const seedUsersData = async () => {
//   const usersData = [
//     {
//     "userName": "חיה",
//     "identity": "215554874",
//     "phone": "0527137011",
//     "password": "haya123",
//     "creditCardNumber": 1234567812345678,
//     "validity": "12/25",
//     "CVV": 123,
//     "usersTypeId": "67951e432b447fb00a5c9e86", 
//     "borrows": []
//   },
//   {
//     "userName": "אסתי",
//     "identity": "987654321",
//     "phone": "052765985",
//     "password": "esti123",
//     "creditCardNumber": 9876543219876543,
//     "validity": "08/24",
//     "CVV": 456,
//     "usersTypeId": "67951e432b447fb00a5c9e87",
//     "borrows": []
//   },
//   {
//     "userName": "חני",
//     "identity": "456123789",
//     "phone": "0527675789",
//     "password": "hani123",
//     "creditCardNumber": 4561237894561230,
//     "validity": "06/26",
//     "CVV": 789,
//     "usersTypeId": "67951e432b447fb00a5c9e87",
//     "borrows": []
//   },
//   {
//     "userName": "יהודית",
//     "identity": "321654987",
//     "phone": "0504165985",
//     "password": "yehudit123",
//     "creditCardNumber": 3216549873216549,
//     "validity": "11/27",
//     "CVV": 101,
//     "usersTypeId": "67951e432b447fb00a5c9e87",
//     "borrows": []
//   }
// ]

//   try {
//     // הוספת הנתונים למסד הנתונים
//     await Users.insertMany(usersData);
//     console.log('הנתונים הוזנו בהצלחה!');
//   } catch (error) {
//     console.error('שגיאה בהזנת הנתונים:', error);
//   }
// };
// seedUsersData();


// יצירת מסמכים לדוגמה
// const carTypes = [
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "פרטי"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "סטיישן"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "משפחתי"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "בימבה"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "מנהלים"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "גי'פ"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "מסחרי"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "מיניבוס"
//     }
// ];

// שמירת המסמכים ב-Collection
// CarTypes.insertMany(carTypes)
//     .then(() => {
//         console.log('CarTypes data added successfully!');
//         mongoose.connection.close(); // סגירת החיבור לאחר שמירה
//     })
//     .catch(err => {
//         console.error('Error adding CarTypes data:', err);
//         mongoose.connection.close(); // סגירת החיבור במקרה של שגיאה
//     });

// const driveType = [
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "דלק",
//         pricePerLiter: 10
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "סולר",
//         pricePerLiter: 8
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "גז",
//         pricePerLiter: 6
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "חשמל",
//         pricePerLiter: 11
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         description: "היברידי",
//         pricePerLiter: 6
//     }
// ];

// שמירת המסמכים ב-Collection
// DriveTypes.insertMany(driveType)
//     .then(() => {
//         console.log('DriveTypes data added successfully!');
//         mongoose.connection.close(); // סגירת החיבור לאחר שמירה
//     })
//     .catch(err => {
//         console.error('Error adding DriveTypes data:', err);
//         mongoose.connection.close(); // סגירת החיבור במקרה של שגיאה
//     });

// const carModels = [
//     {
//         _id: new mongoose.Types.ObjectId(),
//         company: "Kia",
//         model: "Karneval",
//         carTypesId: "67990a1d104f4475425c4ca6"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         company: "Mercedes",
//         model: "EQA",
//         carTypesId: "67990a1d104f4475425c4caa"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         company: "Masda",
//         model: "MX-5",
//         carTypesId: "67990a1d104f4475425c4ca8"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         company: "Tesla",
//         model: "S",
//         carTypesId: "67990a1d104f4475425c4ca6"
//     },
//     {
//         _id: new mongoose.Types.ObjectId(),
//         company: "Toyota",
//         model: "MX-5",
//         carTypesId: "67990a1d104f4475425c4cac"
//     }
// ];

// שמירת המסמכים ב-Collection
// CarModels.insertMany(carModels)
//     .then(() => {
//         console.log('CarModels data added successfully!');
//         mongoose.connection.close(); // סגירת החיבור לאחר שמירה
//     })
//     .catch(err => {
//         console.error('Error adding CarModels data:', err);
//         mongoose.connection.close(); // סגירת החיבור במקרה של שגיאה
//     });

// const cars = [
//   {
//       _id: new mongoose.Types.ObjectId(),
//       licenseNumber: '123-456-78',
//       carModelsId: '679938b736477a4573186033', // <== החלף למזהה המתאים מתוך טבלת CarModels
//       numberOfSeats: 5,
//       image: 'https://example.com/car1.jpg',
//       year: '2022',
//       isGears: true,
//       driveTypesId: '67990c72fb61ad8ce0b04a14', // <== החלף למזהה המתאים מתוך טבלת DriveTypes
//       pricePerHour: 50,
//       needPerKm: 0.5,
//       balanceInLiters: 40,
//       street: 'Herzl St. 10',
//       city: 'Tel Aviv',
//       isAvailable: true,
//   },
//   {
//       _id: new mongoose.Types.ObjectId(),
//       licenseNumber: '234-567-89',
//       carModelsId: '679938b736477a4573186036', // <== החלף למזהה המתאים מתוך טבלת CarModels
//       numberOfSeats: 7,
//       image: 'https://example.com/car2.jpg',
//       year: '2021',
//       isGears: false,
//       driveTypesId: '67990c72fb61ad8ce0b04a15', // <== החלף למזהה המתאים מתוך טבלת DriveTypes
//       pricePerHour: 70,
//       needPerKm: 0.6,
//       balanceInLiters: 35,
//       street: 'Dizengoff St. 15',
//       city: 'Jerusalem',
//       isAvailable: false,
//   },
//  {
//       _id: new mongoose.Types.ObjectId(),
//       licenseNumber: '345-678-90',
//       carModelsId: '679938b736477a4573186032', // <== החלף למזהה המתאים מתוך טבלת CarModels
//       numberOfSeats: 4,
//       image: 'https://example.com/car3.jpg',
//       year: '2020',
//       isGears: true,
//       driveTypesId: '67990c72fb61ad8ce0b04a16', // <== החלף למזהה המתאים מתוך טבלת DriveTypes
//       pricePerHour: 40,
//       needPerKm: 0.4,
//       balanceInLiters: 50,
//       street: 'Ben Gurion St. 20',
//       city: 'Haifa',
//       isAvailable: true,
//   },
//   {
//       _id: new mongoose.Types.ObjectId(),
//       licenseNumber: '456-789-01',
//       carModelsId: '679938b736477a4573186034', // <== החלף למזהה המתאים מתוך טבלת CarModels
//       numberOfSeats: 5,
//       image: 'https://example.com/car4.jpg',
//       year: '2023',
//       isGears: false,
//       driveTypesId: '67990c72fb61ad8ce0b04a17', // <== החלף למזהה המתאים מתוך טבלת DriveTypes
//       pricePerHour: 60,
//       needPerKm: 0.55,
//       balanceInLiters: 30,
//       street: 'Allenby St. 25',
//       city: 'Eilat',
//       isAvailable: false,
//   },
//   {
//       _id: new mongoose.Types.ObjectId(),
//       licenseNumber: '567-890-12',
//       carModelsId: '679938b736477a4573186033', // <== החלף למזהה המתאים מתוך טבלת CarModels
//       numberOfSeats: 8,
//       image: 'https://example.com/car5.jpg',
//       year: '2019',
//       isGears: true,
//       driveTypesId: '67990c72fb61ad8ce0b04a18', // <== החלף למזהה המתאים מתוך טבלת DriveTypes
//       pricePerHour: 80,
//       needPerKm: 0.7,
//       balanceInLiters: 25,
//       street: 'Rothschild St. 30',
//       city: 'Ashdod',
//       isAvailable: true,
//   },
// ];

// Car.insertMany(cars)
//     .then(() => {
//         console.log('Car inserted successfully!');
//     })
//     .catch((err) => {
//         console.error('Error inserting Car:', err);
//     });

app.get('/user-types', async (req, res) => {
    try {
      const userTypes = await UsersType.find(); // שליפה של כל הנתונים
      res.status(200).json(userTypes); // מחזירים את הנתונים כ-JSON
    } catch (err) {
      console.error('Error fetching user types:', err.message);
      res.status(500).send('Internal server error');
    }
  });

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});