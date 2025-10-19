import Borrows from '../models/borrows.js'
import Users from '../models/users.js'
import Car from '../models/car.js'
import Return from '../models/returns.js'

export const addBorrow = (req, res) => {
    const { userId, carId, date, time } = req.body;

    const newBorrow = new Borrows({
        userId,
        carId,
        date,
        time
    });

    newBorrow.save()
        .then(async b => {
            await Users.findByIdAndUpdate(userId, { $push: { borrows: b._id } }, { new: true })
            console.log(userId);
            const car = await Car.findById(carId)
            if (car) {
                car.isAvailable = false;
                await car.save()
            }
            res.status(200).send(b);
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        });
}

export const returnBorrow = (req, res) => {
    const { borrowId, city, street, date, time, balance, totalPayable, isPaidWithSaved,
        identityOfCreditOwner, creditCardNumber, validity, CVV } = req.body
    const theReturn = new Return({
        borrowId,
        city,
        street,
        date,
        time,
        balance,
        totalPayable,
        isPaidWithSaved,
        identityOfCreditOwner,
        creditCardNumber,
        validity,
        CVV
    })
    if (isPaidWithSaved === false) {
        if(!identityOfCreditOwner || !creditCardNumber || !validity || !CVV){
            console.log("hi");
            return res.status(400).send({ error: "identityOfCreditOwner, creditCardNumber, validity, and CVV are required!" })
        }
    }
    if (isPaidWithSaved === true) {
        if(identityOfCreditOwner || creditCardNumber || validity || CVV){
            console.log("hi");
            return res.status(400).send({ error: "identityOfCreditOwner, creditCardNumber, validity, and CVV are forbidden!" })
        }
    }
    theReturn.save()
    .then(async r => {
        // const borrow = await Borrows.findOne({borrowId}).exec()
        const borrow = await Borrows.findById(borrowId).exec();
        // if(borrow){
        //     const dateAndTime = getDate()
        // }
        const carId = borrow.carId;
        const car = await Car.findById(carId).exec();
        console.log(car); 
        if(car){
            car.isAvailable = true;
            car.balanceInLiters = balance;
            car.city = city;
            car.street = street;
            await car.save()
        }
        res.status(200).send(r);
    })
    .catch(error => {
        res.status(500).send({ error: error.message })
    });
}