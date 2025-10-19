import mongoose from "mongoose";

const borrowsSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Users'
    },
    carId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Car'
    },
    date: {
        type: String,
        require: true,
    },
    time: {
        type: String,
        require: true,
    }
})

export default mongoose.model('Borrows', borrowsSchema);