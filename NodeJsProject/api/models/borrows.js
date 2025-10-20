import mongoose from "mongoose";

const borrowsSchema = mongoose.Schema({
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