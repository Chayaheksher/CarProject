import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from 'primereact/dialog';
import swal from "sweetalert";
import { useNavigate } from "react-router";
import '../Styles/SignStyle.css';
import { Link } from "react-router-dom";
import { InputMask } from "primereact/inputmask";
import { signIn } from "./api.js";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../Redux/UserSlice.js";

export const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const send = (sI) => {
        sI.preventDefault()
        console.log(sI);
        let user = {
            identity: sI.target[0].value,
            phone: sI.target[1].value,
            password: sI.target[2].value
        }
        if (!user.identity || !user.phone || !user.password) {
            swal('אויי!', 'מילוי כל השדות - חובה!', 'error')
            return
        }
        signIn(user.identity, user.phone, user.password)
            .then((res) => {
                console.log(res, "איפה הטוקן???????");
                swal(`שלום ${res.data.user.userName}!`, 'הצלחת להתחבר', 'success')
                const token = res.data.token;
                dispatch(setToken(token))
                dispatch(setUser(res.data.user))

                navigate(`/cars`)
                closeDialog();
            })
            .catch((err) => {
                swal(` ${sI.target[0].value}!`, 'אחד או יותר מהפרטים אינם נכונים, תוכל להרשם!', 'error')
                closeDialog();
                navigate('/signUp')
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
        <Dialog header="התחברות" visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
            <form onSubmit={sI => send(sI)}>
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
                    />
                </div>
                <div>
                    <label htmlFor="PA">הכנס סיסמא <span style={{ color: "red" }}> *</span></label>
                    <Password id="PA"
                        placeholder="הכנס סיסמא"
                        minLength={6}
                        required
                        toggleMask
                        feedback={false}                    />
                </div>
                <Button type="submit" label="שלח" />
                <Link to="/signUp" className="link">להרשמה</Link>
            </form>
        </Dialog>
    </>
}