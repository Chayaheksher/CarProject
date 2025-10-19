import Car from "./models/car.js";
import jwt from 'jsonwebtoken'
import multer from 'multer'


export const deleteMiddlware = (req, res, next) => {
    const {carId} = req.params

    Car.findById(carId)
    .then(c=>{
        if(c.isAvailable)
            return next()
        else{
            return res.status(400).send({ error: `car is not available!!!` })
        }
    })
    .catch(err => {
        res.status(500).send({ error: err.message })
    })
}

export const checkAuth = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }
    const arr = authorization.split(' ')
    if (arr.length == 0) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }
    const token = arr[1]
    jwt.verify(token, process.env.SECRET,(error, decoded)=>{
    if (error) {
        return res.status(401).send({ error: error.message })
    }
    if (!decoded) {
        return res.status(401).send({ error: 'Authentication failed!' })
    }
    console.log({ decoded });
    return next()
})
}

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    cb(null, false)
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})
export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter
});
