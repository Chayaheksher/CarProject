import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router"
import '../Styles/CarsStyle.css';
import { InputNumber } from 'primereact/inputnumber';
import { updateCar } from "./api";
import { useSelector } from "react-redux";

export const UpdateCar = () => {
    const navigate = useNavigate()
    const token = useSelector(state => state.user.token);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const car = location.state?.car;
    const [numberOfSeats, setNumberOfSeats] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [balanceInLiters, setBalanceInLiters] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [file, setFile] = useState(null);
    // const send = (cD) => {
    //     cD.preventDefault()
    //     console.log(cD);
    //     // let carData = {
    //     //     numberOfSeats: cD.target[0].value,
    //     //     pricePerHour: cD.target[1].value,
    //     //     balanceInLiters: cD.target[2].value,
    //     //     city: cD.target[3].value,
    //     //     street: cD.target[4].value,
    //     //     // image: file
    //     // };
    //     let carData = {
    //         _id:car._id,
    //         numberOfSeats,
    //         pricePerHour,
    //         balanceInLiters,
    //         city,
    //         street
    //     };
    //     updateCar(carData, token)
    //         .then((res) => {
    //             console.log(res);
    //             swal(`הרכב ${car.licenseNumber} עודכן בהצלחה`, 'הצלחת לעדכן', 'success')
    //         })
    //         .catch((err) => {
    //             swal(` ${car.licenseNumber}`, 'שגיאה בנתונים', 'error')
    //             console.log(err);
    //         });
    //     closeDialog();
    // }
    const send = (cD) => {
        cD.preventDefault();

        // יצירת אובייקט FormData
        const formData = new FormData();
        formData.append('_id', car._id);
        formData.append('numberOfSeats', numberOfSeats);
        formData.append('pricePerHour', pricePerHour);
        formData.append('balanceInLiters', balanceInLiters);
        formData.append('city', city);
        formData.append('street', street);
        if (file) {
            formData.append('image', file); // הוספת התמונה
        }

        updateCar(formData, token)
            .then((res) => {
                console.log(res);
                swal(`הרכב ${car.licenseNumber} עודכן בהצלחה`, 'הצלחת לעדכן', 'success');
            })
            .catch((err) => {
                swal(` ${car.licenseNumber}`, 'שגיאה בנתונים', 'error');
                console.log(err);
            });
        closeDialog();
    };
    const closeDialog = () => {
        setIsOpen(false)
        navigate('/cars', { state: { updated: true } });
    }
    useEffect(() => {
        if (!token) { navigate('/signIn'); return };
        if (car) {
            setNumberOfSeats(car.numberOfSeats || '');
            setPricePerHour(car.pricePerHour || '');
            setBalanceInLiters(car.balanceInLiters || '');
            setCity(car.city || '');
            setStreet(car.street || '');
        }
        setIsOpen(true);
    }, [car]);


    return <>
        <Dialog header="עדכון רכב" visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
            <form onSubmit={cD => send(cD)}>

                <label htmlFor="SE">מספר מקומות</label>
                <InputNumber id="SE"
                    placeholder="מספר מקומות"
                    maxLength={10}
                    // required
                    value={numberOfSeats}
                    onValueChange={(e) => setNumberOfSeats(e?.value || '')}
                ></InputNumber>
                <small style={{ color: "gray" }}>ספרות בלבד</small>
                <div>
                    <label>הכנס תמונת רכב</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                        id="fileUpload"
                    // required
                    />
                    <label htmlFor="fileUpload" style={{ cursor: "pointer", color: "blue" }}>
                        📷 העלה תמונה
                    </label>
                    {car && car.image && (
                        <div>
                            <small style={{ color: "gray" }}>תמונה נוכחית: </small>
                            <small>{car.image}</small>
                        </div>)}
                    {file && <small style={{ color: "gray" }} >נבחרה: {file.name}</small>}
                </div>

                <div>
                    <label htmlFor="PM">מחיר לשעה</label>
                    <InputNumber id="PM"
                        placeholder="מחיר לשעה"
                        // required
                        value={pricePerHour}
                        onValueChange={(e) => setPricePerHour(e?.value || '')}
                    ></InputNumber>
                    <small style={{ color: "gray" }}>ספרות בלבד</small>
                </div>

                <div>
                    <label htmlFor="YL">יתרה בליטרים</label>
                    <InputNumber id="YL"
                        placeholder="יתרה בלטרים"
                        // required
                        value={balanceInLiters}
                        onValueChange={(e) => setBalanceInLiters(e?.value || '')}
                    ></InputNumber>
                    <small style={{ color: "gray" }}>ספרות בלבד</small>
                </div>
                <div>
                    <label htmlFor="CT">עיר</label>
                    <InputText id="CT"
                        placeholder="עיר"
                        maxLength={30}
                        // required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></InputText>
                </div>
                <div>
                    <label htmlFor="ST">רחוב</label>
                    <InputText id="ST"
                        placeholder="רחוב"
                        maxLength={30}
                        // required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    ></InputText>
                </div>
                <Button type="submit" label="שלח" />
            </form>
        </Dialog>
    </>
}