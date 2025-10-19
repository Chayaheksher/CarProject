import mongoose from "mongoose";

const carSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    licenseNumber: {
        type: String,
        require: true
    },
    carModelsId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'CarModels'
    },
    numberOfSeats: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true,
    },
    year: {
        type: String,
        require: true,
    },
    isGears: {
        type: Boolean,
        require: true,
    },
    driveTypesId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'DriveTypes'
    },
    pricePerHour: {
        type: Number,
        require: true,
    },
    needPerKm: {
        type: Number,
        require: true,
    },
    balanceInLiters: {
        type: Number,
        require: true,
    },
    street: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    isAvailable: {
        type: Boolean,
        require: true,
    },
})

export default mongoose.model('Car', carSchema);