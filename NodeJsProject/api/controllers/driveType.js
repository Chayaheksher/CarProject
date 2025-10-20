import DriveType from "../models/driveType.js";

export const updatePrice = (req, res) => {
        const {driveTypeId} = req.params
        const { pricePerLiter } = req.body;
    
        DriveType.findByIdAndUpdate(driveTypeId, req.body, {new:true})
        .then(dt => {
            res.status(200).send({ message: `update price ${dt._id} to ${dt.pricePerLiter} succeed!`, dt })
        })
        .catch(error => {
            res.status(500).send({message: error.message})
        })
}

export const allDriveType = (req, res) => {
    DriveType.find()
    .then(dt=>{
        res.status(200).send(dt)
    })
    .catch(error=>{
        res.status(500).send({message: error.message})
    })
}