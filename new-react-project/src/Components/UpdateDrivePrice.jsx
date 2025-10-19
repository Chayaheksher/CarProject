import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import swal from "sweetalert";
import '../Styles/SignStyle.css';
import { InputNumber } from "primereact/inputnumber";
import { useLocation, useNavigate } from 'react-router-dom';
import {updateDriveType} from './api.js'
import { useSelector } from "react-redux";

export const UpdateDrivePrice = () => {
    const navigate = useNavigate()
    const location =useLocation()
    const driveType = location.state?.rowData;
    const token = useSelector(state => state.user.token);
    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => {
        setIsOpen(false)
        navigate("/driveTypes", { state: { updated: true } });
    }

    useEffect(() => {
        if (!token) {navigate('/signIn'); return};
        setIsOpen(true)
    }, []);

    const updateCar = () => {
        let drriveType = {
            _id:driveType._id,
            pricePerLiter: newPrice
        };
        updateDriveType(drriveType, token)
        .then((res) => {
            swal(`עדכון ההנעה למחיר ${newPrice}!`, 'בוצע בהצלחה!!', 'success')
            console.log(res);
        })
        .catch((err) => {
            swal(` ${newPrice}!`, 'שגיאה בעדכון המחיר', 'error')
            console.log(err);
        });
        closeDialog()
    }

    const [newPrice, setNewPrice] = useState(null)
    const header = `עדכון מחירון ${driveType?.description}`
    return <>
        <Dialog header={header} visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">המחיר עד כה היה {driveType?.pricePerLiter}</h2>
                <div>
                    <label htmlFor="NP">המחיר החדש<span style={{ color: "red" }}> *</span></label>
                    <InputNumber id="NP"
                        placeholder="המחיר החדש"
                        maxLength={10}
                        required
                        value={newPrice}
                        onValueChange={(e) => setNewPrice(e.value)}
                    ></InputNumber>
                    <small style={{ color: "gray" }}>ספרות בלבד</small>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button icon="pi pi-check" label="עדכן" className="p-button-success mr-2" onClick={updateCar} />
                <Button icon="pi pi-times" label="בטל" className="p-button-secondary" onClick={closeDialog} />
            </div>
        </Dialog>
    </>
}