import Users from '../models/users.js'
import jwt from 'jsonwebtoken'

export const signIn = (req, res) => {

    const { identity, phone, password } = req.params;

    Users.findOne({ identity: identity, phone: phone, password: password })
        .then(user => {
            if (!user) {
                return res.status(404).send({ error: 'user not found!' });
            }
            const token = jwt.sign(
                { username: user.userName, phone },
                process.env.SECRET,
                {
                    expiresIn: '1hr',
                }
            )
            console.log("Generated Token:", token);
            res.status(200).send({ user, token })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        });
}

export const signUp = (req, res) => {

    const { userName, identity, phone, password, creditCardNumber, validity, CVV } = req.body;

    const newUser = new Users({
        userName,
        identity,
        phone,
        password,
        creditCardNumber,
        validity,
        CVV,
        usersTypeId : "67951e432b447fb00a5c9e87"
    });

    newUser.usersTypeId === "67951e432b447fb00a5c9e87";
    newUser.save()
        .then(u => {
            const token = jwt.sign(
                { username: u.userName, phone },
                process.env.SECRET,
                {
                    expiresIn: '1hr',
                }
            )
            console.log("Generated Token:", token);
            res.status(200).send({u, token});
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        });
}

