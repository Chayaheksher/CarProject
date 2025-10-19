//כאן בעז"ה שתי פונקציות: התחברות, הרשמה
// התחברות - signin
// הרשמה - signup
// למנהל יש רק התחברות, למשתמש גם וגם
import Users from '../models/users.js'
import jwt from 'jsonwebtoken'

//התחברות
export const signIn = (req, res) => {

    const { identity, phone, password } = req.params;

    // if (!identity || !phone || !password) {
    //     return res.status(400).send({ error: 'Missing identity or phone or password!' });
    // }

    Users.findOne({ identity: identity, phone: phone, password: password })
        .then(user => {
            if (!user) {
                //להעביר אותו בריאקט לפונקציית הרשמה
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

//הרשמה
export const signUp = (req, res) => {

    const { userName, identity, phone, password, creditCardNumber, validity, CVV } = req.body;

    const newUser = new Users({
        // _id: new mongoose.Types.ObjectId(),
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

