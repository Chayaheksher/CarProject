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
  optionsSuccessStatus: 200
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

app.get('/user-types', async (req, res) => {
    try {
      const userTypes = await UsersType.find();
      res.status(200).json(userTypes);
    } catch (err) {
      console.error('Error fetching user types:', err.message);
      res.status(500).send('Internal server error');
    }
  });

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});