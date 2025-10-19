import mongoose from "mongoose";

const carModelsSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    company: {
        type: String,
        require: true,
        maxLength: 50
    },
    model: {
        type: String,
        require: true,
    },
    carTypesId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'CarTypes'
    }
})

export default mongoose.model('CarModels', carModelsSchema);