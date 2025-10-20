import Borrows from '../models/borrows.js'
import Users from '../models/users.js'
import Returns from '../models/returns.js'


export const allBorrows = (req, res) => {
    const { userId } = req.query;
    Borrows.find()
        .populate({ path: 'userId', select: 'userName _id' })
        .populate({ path: 'carId', select: 'licenseNumber _id isAvailable balanceInLiters pricePerHour', populate: { path: 'driveTypesId', select: 'pricePerLiter' } })
        .then(borrows => {
            return Promise.all(
                borrows.map(borrow => {
                    borrow = borrow.toObject(); 

                    return Returns.findOne({ borrowId: borrow._id })
                        .then(returnRecord => {
                            borrow.returnDate = returnRecord ? returnRecord.date : null;
                            borrow.returnTime = returnRecord ? returnRecord.time : null;
                            return borrow;
                        })
                        .catch(() => {
                            borrow.returnDate = null;
                            borrow.returnTime = null;
                            return borrow;
                        });
                })
            );
        })
        .then(borrows => {
            if (userId) {
                Users.findById(userId).then(user => {
                    if (!user) return res.status(404).send({ message: "User not found in database" });
            
                    const userBorrows = user.borrows || [];
                    const filteredBorrows = borrows.filter(borrow => userBorrows.includes(borrow._id.toString()));
            
                    res.status(200).send({ borrows: filteredBorrows });
                }).catch(error => res.status(500).send({ message: error.message }));
            } else {
                res.status(200).send({ borrows });
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
};




export const borrowsById = async (req, res) => {
    const { userId } = req.params;

    const user = await Users.findById(userId).exec();
    if (!user) {
        return res.status(404).send({ message: "User not found in database" });
    }
    console.log(user);

    const userBorrows = user.borrows;

    console.log(userBorrows);

    Borrows.find({ _id: { $in: userBorrows } })
        .populate({ path: 'userId', select: 'userName _id' })
        .populate({ path: 'carId', select: 'licenseNumber _id isAvailable' })
        .then(b => {
            res.status(200).send(b);
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        })
}


export const returnDate = (req, res) => {
    const {borrowId} = req.params
    Returns.find({borrowId:borrowId})
    .select('date time')
    .then(r=>{
        res.status(200).send(r);
    })
    .catch(error => {
        res.status(500).send({ message: error.message })
    })
}