import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from 'primereact/dialog';
import swal from "sweetalert";
import { useNavigate } from "react-router"
import '../Styles/SignStyle.css';
import { Link } from "react-router-dom";
import { InputMask } from "primereact/inputmask";
import { signUp } from "./api.js";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../Redux/UserSlice.js";

export const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const send = (sU) => {
        sU.preventDefault()
        console.log(sU);

        let user = {
            userName: sU.target[0].value,
            identity: sU.target[1].value,
            phone: sU.target[2].value,
            password: sU.target[3].value,
            creditCardNumber: parseInt(sU.target[4].value.replace(/-/g, '')), // הסרת מקפים והמרה למספר
            validity: sU.target[5].value,
            CVV: parseInt(sU.target[6].value) // המרה למספר
        };
        console.log(user);

        if (!user.userName || !user.identity || !user.phone || !user.password || !user.creditCardNumber || !user.validity || !user.CVV) {
            swal('אויי!', 'מילוי כל השדות - חובה!', 'error');
            return;
        }

        signUp(user)
            .then((res) => {
                console.log(res, 'הרשמה');
                swal(`שלום ${res.data.u.userName}!`, 'הצלחת להרשם', 'success')
                const token = res.data.token;
                dispatch(setToken(token)) 
                dispatch(setUser(res.data.u))
                navigate(`/cars`)
                closeDialog();
            })
            .catch((err) => {
                swal(` ${sU.target[0].value}!`, 'שגיאה בנתונים', 'error')
                console.log(err);
            });
    }
    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => {
        setIsOpen(false)
    }
    useEffect(() => {
        setIsOpen(true)
    }, []);
    return <>
        הרשמה

        <Dialog header="הרשמה" visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
            <form onSubmit={sU => send(sU)}>
                <div>
                    <label htmlFor="NA">הכנס שם משתמש <span style={{ color: "red" }}> *</span></label>
                    <InputText id="NA"
                        placeholder="הכנס שם משתמש"
                        required
                    ></InputText>
                </div>
                <div>
                    <label htmlFor="ID">הכנס מספר זהות <span style={{ color: "red" }}> *</span></label>
                    <InputMask id='ID'
                        mask="999999999"
                        placeholder="הכנס מספר זהות"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="PH">הכנס נייד <span style={{ color: "red" }}> *</span></label>
                    <InputText id="PH"
                        placeholder="הכנס נייד"
                        maxLength={10}
                        required
                    ></InputText>
                </div>
                <div>
                    <label htmlFor="PA">הכנס סיסמא <span style={{ color: "red" }}> *</span></label>
                    <Password id="PA"
                        placeholder="הכנס סיסמא"
                        minLength={6}
                        required
                        toggleMask 
                        feedback={false}
                    />
                </div>
                    <div>
                        <label htmlFor="CCN">מס' כרטיס אשראי <span style={{ color: "red" }}> *</span></label>
                        <InputMask id="CCN" mask="9999-9999-9999-9999" placeholder="מס' כרטיס אשראי" required />
                    </div>
                    <div>
                        <label htmlFor="EXP">תוקף <span style={{ color: "red" }}> *</span></label>
                        <InputMask id="EXP" mask="99/99" placeholder="תוקף" required />
                    </div>
                    <div>
                        <label htmlFor="CVV">CVV <span style={{ color: "red" }}> *</span></label>
                        <InputMask id="CVV" mask="999" placeholder="CVV" required />
                    </div>
                <Button type="submit" label="שלח" />
                <Link to="/signIn" className="link">להתחברות</Link>
            </form>
        </Dialog>
    </>
}

