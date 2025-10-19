import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import swal from "sweetalert";
import { useNavigate } from "react-router"
import { Dropdown } from "primereact/dropdown";
import '../Styles/SignStyle.css';
import { allCarTypes, addNewModel } from "./api.js";
import { useSelector } from "react-redux";

export const AddModel = () => {

    const navigate = useNavigate()
    const token = useSelector(state => state.user.token);
    const send = (sI) => {
        sI.preventDefault()
        console.log(sI);

        let model = {
            company: sI.target.elements.CN.value || '',
            model: sI.target.elements.CM.value || '',
            carTypesId: selectedCarType || ''
        };
        console.log(model);
        if (!model.company || !model.model || !model.carTypesId) {
            swal('אויי!', 'מילוי כל השדות - חובה!', 'error');
            return;
        }
        addNewModel(model, token)
            .then((res) => {
                console.log(res);
                swal(`הדגם ${model.model} נוסף בהצלחה`, 'הצלחת להוסיף', 'success')
            })
            .catch((err) => {
                swal(` ${model.model}!`, 'שגיאה בנתונים', 'error')
                console.log(err);
            });
        closeDialog();
    }

    const [isOpen, setIsOpen] = useState(false);
    const [carType, setCarType] = useState([]);
    const [selectedCarType, setSelectedCarType] = useState();
    const closeDialog = () => {
        setIsOpen(false)
        navigate(`/displayModels`, { state: { added: true } });
    }
    useEffect(() => {
        if (!token) { navigate('/signIn'); return };
        setIsOpen(true)
        fetchAllCarTypes();
    }, []);
    useEffect(() => {
        if (carType.length > 0 && selectedCarType === undefined) {
            setSelectedCarType(carType[0]?.value);
        }
    }, [carType, selectedCarType]);
    const fetchAllCarTypes = () => {
        allCarTypes()
            .then((res) => {
                console.log(res.data);
                const formattedCarTypes = res.data.map(carType => ({
                    name: carType.description,
                    value: carType._id
                }));
                setCarType(formattedCarTypes);
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return <>
        <Dialog header="הוספת דגם" visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
            <form onSubmit={sI => send(sI)}>
                <div>
                    <label htmlFor="CN">הכנס שם חברה<span style={{ color: "red" }}> *</span></label>
                    <InputText id="CN"
                        placeholder="הכנס שם חברה"
                        maxLength={30}
                        required
                    ></InputText>
                </div>
                <div>
                    <label htmlFor="CM">הכנס שם דגם <span style={{ color: "red" }}> *</span></label>
                    <InputText id="CM"
                        placeholder="הכנס שם דגם"
                        maxLength={30}
                        required
                    ></InputText>
                </div>
                <label htmlFor="DR">קוד סוג רכב<span style={{ color: "red" }}> *</span></label>
                <Dropdown
                    id="DR"
                    value={selectedCarType}
                    onChange={(e) => setSelectedCarType(e.value)}
                    options={carType}
                    optionLabel="name"
                    placeholder="קוד סוג רכב"
                    className="w-full md:w-14rem"
                />
                <Button type="submit" label="שלח" />
            </form>
        </Dialog>
    </>
}