import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        maxLength: 50
    },
    identity: {
        type: String,
        require: true,
        maxLength: 9
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    creditCardNumber: {
        type: Number,
        require: true,
    },
    validity: {
        type: String,
        require: true,
    },
    CVV:{
        type: Number,
        require: true,
        maxLength:3
    },
    usersTypeId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'UsersType'
    },
    borrows: [{
        type: mongoose.Types.ObjectId,
        ref: 'Borrows'
    }]
})

export default mongoose.model('Users', usersSchema);