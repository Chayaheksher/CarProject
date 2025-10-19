import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import '../Styles/CarDetailsStyle.css';
import { useSelector } from 'react-redux';


export const CarDetails = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const car = location.state.car;
    const closeDialog = () => {
        setIsOpen(false)
        navigate(`/cars`)
    }

    useEffect(() => {
        if (!token) {navigate('/signIn'); return};
        setIsOpen(true)
    }, []);

    return <>
        <Dialog header="פרטי רכב" visible={isOpen} style={{ width: '50vw' }} onHide={closeDialog} className="rtl-dialog">
             {car?
             ( <div >
                <p>{car.isAvailable ? "זמין להשאלה" : "לא זמין להשאלה"}</p>
                {car.isAvailable && <Button label=" ביצוע השאלה " icon="pi pi-check" className="p-button-raised p-button-rounded" onClick={() => navigate('/makeBorrow', { state: { car } } )} />}
                    <h1 >{car.carModelsId.company}</h1>
                    <h2 >{car.carModelsId.model}</h2>
                    <h3>{car.licenseNumber}</h3>
                    <h4>{car.carModelsId.carTypesId.description}</h4>
                    <img className="car-image"  src={`${process.env.REACT_APP_PUBLIC_URL}${car.image}`} alt={car.licenseNumber} />
                    <p>{car.numberOfSeats} מקומות</p>
                    <p>{car.street}, {car.city}</p>
                    <span>שנת יצור {car.year}</span>
                    <p>יתרה בליטרים {car.balanceInLiters}</p>
                    <p>צריכה לקמ"ש {car.needPerKm}</p>
                    {car.isGears ?<span>הילוכים ידניים</span> : <span>הילוכים אוטמטיים</span>}
                    <p>{car.driveTypesId.description}, מחיר לשעה {car.driveTypesId.pricePerLiter} ש"ח</p>
                    <h3>מחיר לשעה {car.pricePerHour} ש"ח</h3>
                </div>
             ) :(<p>הרכב לא נמצא</p>)}
        </Dialog>
    </>
}