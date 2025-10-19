import mongoose from "mongoose";

const usersTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: {
        type: String,
        require: true,
        maxLength: 50
    }
})

export default mongoose.model('UsersType', usersTypeSchema);