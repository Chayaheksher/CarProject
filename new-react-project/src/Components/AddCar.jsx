import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import swal from "sweetalert";
import { useNavigate } from "react-router"
import '../Styles/CarsStyle.css';
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { allCarModels, allDriveTypes, addCar } from './api';
import { useSelector } from "react-redux";


export const AddCar = () => {
    const navigate = useNavigate()
    const token = useSelector(state => state.user.token);
    const [isOpen, setIsOpen] = useState(false);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState();
    const [driveType, setDriveType] = useState([]);
    const [selectedDriveType, setSelectedDriveType] = useState();
    const [file, setFile] = useState(null);
    const [ingredient, setIngredient] = useState(false)
    const send = (sI) => {
        sI.preventDefault();

        if (!file) {
            swal('אויי!', 'חובה להעלות תמונה!', 'error');
            return;
        }

        const formData = new FormData();
        formData.append("licenseNumber", sI.target.elements.NUM.value);
        formData.append("carModelsId", selectedModel);
        formData.append("numberOfSeats", parseInt(sI.target.elements.SE.value, 10));
        formData.append("year", sI.target.elements.YE.value);
        formData.append("isGears", ingredient);
        formData.append("driveTypesId", selectedDriveType);
        formData.append("pricePerHour", parseInt(sI.target.elements.PM.value));
        formData.append("needPerKm", parseInt(sI.target.elements.NK.value));
        formData.append("balanceInLiters", parseInt(sI.target.elements.YL.value));
        formData.append("city", sI.target.elements.CT.value);
        formData.append("street", sI.target.elements.ST.value);
        formData.append("image", file);  

        console.log("FormData Sent:", formData);

        addCar(formData, token) 
            .then((res) => {
                console.log(res);
                swal(`הרכב נוסף בהצלחה`, 'הצלחת להוסיף', 'success');
                closeDialog();
            })
            .catch((err) => {
                swal('שגיאה!', 'נכשל להוסיף את הרכב', 'error');
                console.log(err);
            });
    };


    const closeDialog = () => {
        setIsOpen(false)
        navigate(`/cars`, { state: { updated: true } })
    }
    useEffect(() => {
        if (!token) { navigate('/signIn'); return };
        setIsOpen(true)
        fetchAllModels()
        fetchAllDriveTypes()
    }, []);

    useEffect(() => {
        if (models.length > 0 && selectedModel === undefined) {
            setSelectedModel(models[0]?.value);
        }
    }, [models, selectedModel]);

    useEffect(() => {
        if (driveType.length > 0 && selectedDriveType === undefined) {
            setSelectedDriveType(driveType[0]?.value);
        }
    }, [driveType, selectedDriveType]);

    const fetchAllModels = () => {
        allCarModels()
            .then((res) => {
                console.log(res.data);
                const formattedModels = res.data.map(car => ({
                    name: `${car.company} ${car.model}`,
                    value: car._id
                }));
                setModels(formattedModels);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const fetchAllDriveTypes = () => {
        allDriveTypes()
            .then((res) => {
                console.log(res.data);
                const formattedDriveTypes = res.data.map(driveType => ({
                    name: driveType.description,
                    value: driveType._id
                }));
                setDriveType(formattedDriveTypes);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return <>
        <Dialog header="הוספת רכב" visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
            <form onSubmit={sI => send(sI)}>
                <div>
                    <label htmlFor="NUM">הכנס מספר רישוי <span style={{ color: "red" }}> *</span></label>
                    <InputText name="NUM"
                        placeholder="הכנס מספר רישוי"
                        required
                    ></InputText>
                </div>

                <label htmlFor="MO">הכנס מודל רכב<span style={{ color: "red" }}> *</span></label>
                <Dropdown
                    name="MO"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.value)}
                    options={models}
                    optionLabel="name"
                    placeholder="הכנס מודל רכב"
                    className="w-full md:w-14rem"
                />
                <div>
                    <label htmlFor="SE">מספר מקומות<span style={{ color: "red" }}> *</span></label>
                    <InputNumber name="SE"
                        placeholder="מספר מקומות"
                        maxLength={10}
                        required
                    ></InputNumber>
                    <small style={{ color: "gray" }}>ספרות בלבד</small>
                </div>
                <div>
                    <label>הכנס תמונת רכב<span style={{ color: "red" }}> *</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        id="fileUpload"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                        required
                    />
                    <label htmlFor="fileUpload" style={{ cursor: "pointer", color: "blue" }}>
                        📷 העלה תמונה
                    </label>
                    {file && <small style={{ color: "gray" }} >נבחרה: {file.name}</small>}
                </div>
                <div>
                    <label htmlFor="YE">הכנס שנה<span style={{ color: "red" }}> *</span></label>
                    <InputNumber name="YE"
                        placeholder="הכנס שנה"
                        maxLength={4}
                        required
                        useGrouping={false}
                    ></InputNumber>
                    <small style={{ color: "gray" }}>ספרות בלבד</small>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>גיר אוטומט/ידני <span style={{ color: "red" }}> *</span></label>
                    <div className="flex gap-3" style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                        <RadioButton
                            inputId="ingredient1"
                            name="gir"
                            value={false}
                            onChange={(e) => setIngredient(false)}
                            checked={ingredient === false}
                        />
                        <label htmlFor="ingredient1" className="ml-2" style={{ marginRight: '10px' }}>אוטומטי</label>
                        <RadioButton
                            inputId="ingredient2"
                            name="gir"
                            value={true}
                            onChange={(e) => setIngredient(true)}
                            checked={ingredient === true}
                        />
                        <label htmlFor="ingredient2" className="ml-2">ידני</label>
                    </div>
                </div>
                <label htmlFor="DR">הכנס סוג הנעה<span style={{ color: "red" }}> *</span></label>
                <Dropdown
                    name="DR"
                    value={selectedDriveType}
                    onChange={(e) => setSelectedDriveType(e.value)}
                    options={driveType}
                    optionLabel="name"
                    placeholder="הכנס סוג הנעה"
                    className="w-full md:w-14rem"
                />
                <div>
                    <label htmlFor="PM">מחיר לשעה<span style={{ color: "red" }}> *</span></label>
                    <InputNumber name="PM"
                        placeholder="מחיר לשעה"
                        required
                    ></InputNumber>
                    <small style={{ color: "gray" }}>ספרות בלבד</small>
                </div>
                <div>
                    <label htmlFor="NK">צריכה לקמ"ש<span style={{ color: "red" }}> *</span></label>
                    <InputNumber name="NK"
                        placeholder="צריכה לקמ''ש"
                        required
                    ></InputNumber>
                    <small style={{ color: "gray" }}>ספרות בלבד</small>
                </div>
                <div>
                    <label htmlFor="YL">יתרה בליטרים<span style={{ color: "red" }}> *</span></label>
                    <InputNumber name="YL"
                        placeholder="יתרה בליטרים"
                        required
                    ></InputNumber>
                    <small style={{ color: "gray" }}>ספרות בלבד</small>
                </div>
                <div>
                    <label htmlFor="CT">עיר<span style={{ color: "red" }}> *</span></label>
                    <InputText name="CT"
                        placeholder="עיר"
                        maxLength={30}
                        required
                    ></InputText>
                </div>
                <div>
                    <label htmlFor="ST">רחוב<span style={{ color: "red" }}> *</span></label>
                    <InputText name="ST"
                        placeholder="רחוב"
                        maxLength={30}
                        required
                    ></InputText>
                </div>
                <Button type="submit" label="שלח" />
            </form>
        </Dialog>
    </>
}