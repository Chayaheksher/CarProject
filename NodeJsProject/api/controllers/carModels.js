import CarModels from '../models/carModels.js'

export const allModels = (req, res) => {
    CarModels.find()
    .populate({path: 'carTypesId'})
    .then(m=>{
        res.status(200).send(m)
    })
    .catch(eroor=>{
        res.status(500).send({message: error.message})
    })
}

export const addModel = (req, res) => {
    const {company, model, carTypesId} = req.body
    const newModel = new CarModels({
        company,
        model,
        carTypesId
    })
    newModel.save()
    .then(m=>{
        res.status(200).send(m)
    })
    .catch(eroor=>{
        res.status(500).send({message: error.message})
    })
}