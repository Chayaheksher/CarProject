import Borrows from '../models/borrows.js'
import Users from '../models/users.js'
import Returns from '../models/returns.js'


//הצגת כל ההשאלות למנהל
//בינתיים גם למשתמש
// export const allBorrows = (req, res) => {
//     const { userId } = req.query;
//     Borrows.find()
//         .populate({ path: 'userId', select: 'userName _id' })
//         .populate({ path: 'carId', select: 'licenseNumber _id isAvailable' })
//         .then(async b => {
//             // for (const element of b) {
//             //     if(element.carId.isAvailable){
//             //         console.log('זמין')
//             //         const x = await Returns.findOne({borrowId:element._id})
//             //         element.set('returnDate', x ? x.date : null)
//             //         console.log(element);
//             //     }
//             // };
//             if(userId){
//              b=await b.filter(borrow => borrow.userId == userId)}
//             res.status(200).send({b});
//         })
//         .catch(error => {
//             res.status(500).send({ message: error.message })
//         })
// }
// export const allBorrows = (req, res) => {
//     const { userId } = req.query;
//     Borrows.find()
//         .populate({ path: 'userId', select: 'userName _id' })
//         .populate({ path: 'carId', select: 'licenseNumber _id isAvailable balanceInLiters pricePerHour', populate: { path: 'driveTypesId', select: 'pricePerLiter' } })
//         .then(borrows => {
//             return Promise.all(
//                 borrows.map(borrow => {
//                     borrow = borrow.toObject(); // המרת המסמך לאובייקט רגיל
//                     borrow.isAvailable = borrow.carId?.isAvailable || false;

//                     if (borrow.isAvailable) {
//                         // חיפוש תאריך ושעת החזרה לפי מזהה ההשאלה (borrowId)
//                         return Returns.findOne({ borrowId: borrow._id })
//                             .then(returnRecord => {
//                                 borrow.returnDate = returnRecord ? returnRecord.date : null;
//                                 borrow.returnTime = returnRecord ? returnRecord.time : null;
//                                 return borrow;
//                             })
//                             .catch(() => {
//                                 borrow.returnDate = null;
//                                 borrow.returnTime = null;
//                                 return borrow;
//                             });
//                     } else {
//                         borrow.returnDate = null;
//                         borrow.returnTime = null;
//                         return Promise.resolve(borrow);
//                     }
//                 })
//             );
//         })
//         .then( borrows => {
//             if (userId) {
//                 Users.findById(userId).then(user => {
//                     if (!user) return res.status(404).send({ message: "User not found in database" });
            
//                     const userBorrows = user.borrows || [];
//                     const filteredBorrows = borrows.filter(borrow => userBorrows.includes(borrow._id.toString()));
            
//                     res.status(200).send({ borrows: filteredBorrows });
//                 }).catch(error => res.status(500).send({ message: error.message }));
//             } else {
//                 res.status(200).send({ borrows });
//             }
//             // console.log(borrows, "bbbbbbbbbbbbbbb")
//         })
//         .catch(error => {
//             res.status(500).send({ message: error.message });
//         });
// };

export const allBorrows = (req, res) => {
    const { userId } = req.query;
    Borrows.find()
        .populate({ path: 'userId', select: 'userName _id' })
        .populate({ path: 'carId', select: 'licenseNumber _id isAvailable balanceInLiters pricePerHour', populate: { path: 'driveTypesId', select: 'pricePerLiter' } })
        .then(borrows => {
            return Promise.all(
                borrows.map(borrow => {
                    borrow = borrow.toObject(); // המרת המסמך לאובייקט רגיל
                    // borrow.isAvailable = borrow.carId?.isAvailable || false;

                    // חיפוש תאריך ושעת ההחזרה לפי מזהה ההשאלה (borrowId)
                    return Returns.findOne({ borrowId: borrow._id })
                        .then(returnRecord => {
                            // הוספת תאריך ושעת ההחזרה להשאלה
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




//הצגת ההשאלות לפי משתמש
//בינתיים לא בשימוש
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
        // .where({ _id: { $in: u.borrows } });
        .then(b => {
            res.status(200).send(b);
        })
        .catch(error => {
            res.status(500).send({ message: error.message })
        })
}


//החזרת תאריך החזרה להשאלות שהוחזרו כבר
//בינתיים לא בשימוש
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