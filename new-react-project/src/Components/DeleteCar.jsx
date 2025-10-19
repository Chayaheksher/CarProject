import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router"
import '../Styles/SignStyle.css';
import { deleteTheCar } from "./api.js"; 
import { useSelector } from "react-redux";  

export const DeleteCar = () => {
    const token = useSelector(state => state.user.token);
    const navigate = useNavigate()
    const { carId } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => {
        setIsOpen(false)
        navigate(`/cars`, {state: {deleted: true}})
    }

    useEffect(() => {
        if (!token) {navigate('/signIn'); return};
        setIsOpen(true)
    }, []);

    const deleteCar = () => {
        deleteTheCar(carId, token)
        .then((res) => {
            console.log(res);
            swal(`מחיקת רכב ${carId}!`, 'בוצעה בהצלחה!!', 'success')
        })
        .catch((err) => {
            swal(` ${carId}!`, 'שגיאה במחיקה', 'error')
            console.log(err);
        });
        closeDialog()
    }

    return <>
        <Dialog header="מחיקת רכב" visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">האם אתה בטוח שברצונך למחוק את רכב</h2>
            <span>{carId}  ???</span>
                <div className="flex gap-2">
                    <Button
                        label="מחק"
                        icon="pi pi-trash"
                        className="p-button-danger"
                        onClick={deleteCar}
                    />
                    <Button
                        label="בטל"
                        icon="pi pi-times"
                        className="p-button-secondary"
                        onClick={closeDialog}
                    />
                </div>
            </div>
        </Dialog>
    </>
}