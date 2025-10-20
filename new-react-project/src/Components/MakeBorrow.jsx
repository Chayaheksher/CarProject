import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import swal from "sweetalert";
import { useNavigate } from "react-router"
import '../Styles/SignStyle.css';
import { Calendar } from 'primereact/calendar';
import { useLocation } from "react-router";
import { addBorrow } from "./api";
import { useSelector } from "react-redux";


export const MakeBorrow = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const car = location.state.car;
    const token = useSelector(state => state.user.token);
    const user = useSelector(state => state.user);
    const send = (sI) => {
        sI.preventDefault()
        console.log(sI);
        const date = dateTime.toLocaleDateString('en-GB');
        const time = dateTime.toLocaleTimeString('en-GB');
        let borrow = {
            carId: car._id,
            userId: user._id,
            carNum: sI.target[0].value,
            date: date,
            time: time
        }
        if (!borrow.carNum || !borrow.date || !borrow.time) {
            swal('אויי!', 'מילוי כל השדות - חובה!', 'error')
            return
        }
        addBorrow(borrow, token)
            .then((res) => {
                swal(`השאלת רכב  ${sI.target[0].value}!`, 'הצליחה', 'success')
            })
            .catch((err) => {
                swal(`השאלת רכב ${car.licenseNumber}!`, 'לא הצליחה', 'success')
                console.log(err);
            })
        closeDialog();
    }
    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => {
        setIsOpen(false)
        navigate(`/displayBorrow`, { state: { added: true } })
    }
    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        if (!token) { navigate('/signIn'); return };
        const today = new Date();
        setDateTime(today);
        setIsOpen(true)
    }, []);
    return <>
        <Dialog header="ביצוע השאלה" visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
            <form onSubmit={sI => send(sI)}>
                <div>
                    <label htmlFor="ID">הכנס לוחית רישוי <span style={{ color: "red" }}> *</span></label>
                    <InputText id="ID"
                        placeholder="הכנס לוחית רישוי"
                        maxLength={30}
                        required
                        value={car.licenseNumber}
                    ></InputText>
                </div>
                <div>
                    <label htmlFor="dateTime">הכנס תאריך ושעה <span style={{ color: "red" }}> *</span></label>
                    <Calendar
                        id="dateTime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.value)}
                        showTime
                        required
                    />
                </div>
                <Button type="submit" label="אישור" />
            </form>
        </Dialog>
    </>
}