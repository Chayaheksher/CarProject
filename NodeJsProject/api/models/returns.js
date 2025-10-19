import mongoose from "mongoose";

const returnsSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    borrowId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Borrows'
    },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        require: true,
    },
    totalPayable: {
        type: Number,
        require: true,
    },
    isPaidWithSaved: {
        type: Boolean,
        require: true,
    },
    identityOfCreditOwner:{
        type: Number,
        require: false
    },
    creditCardNumber: {
        type: Number,
        require: false
    },
    validity: {
        type: String,
        require: false
    },
    CVV:{
        type: Number,
        require: false,
        maxLength:3
    }
})

export default mongoose.model('Returns', returnsSchema);