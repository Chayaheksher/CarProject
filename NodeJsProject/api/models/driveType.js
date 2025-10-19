import mongoose from "mongoose";

const driveTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: {
        type: String,
        require: true,
        maxLength: 50
    },
    pricePerLiter:{
        type: Number,
        require: true,
    }
})

export default mongoose.model('DriveTypes', driveTypeSchema);