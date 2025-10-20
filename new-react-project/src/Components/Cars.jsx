import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../Styles/CarsStyle.css';
import { Tooltip } from 'primereact/tooltip';
import { Link, useLocation } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import { Fuel, Truck, Flame, Bolt, RefreshCcw, HelpCircle } from 'lucide-react';
import { allCars, allCarModels, allDriveTypes, allCarTypes } from './api.js';
import { SearchCombo } from './SearchCombo.jsx';
import { useSelector } from 'react-redux';


export const Cars = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [cars, setCars] = useState([]);
    const location = useLocation();
    const [currentFilterData, setCurrentFilterData] = useState([]);

    useEffect(() => {
        if (location.state?.deleted || location.state?.updated || location.state?.added) {
            fetchCars();
        }
        fetchCars();
        console.log("user object:", user);
    }, [location.state]);

    const fetchCars = (filterType, query) => {
        allCars(filterType, query)
            .then((res) => {
                setCars(res.data.c);
                console.log(res.data.c, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        console.log("Updated currentFilterData:", currentFilterData);
    }, [currentFilterData]);
    const fetchFilterData = async (filterType) => {
        try {
            let data = [];
            switch (filterType) {
                case 0:
                    const response = await allCarModels();
                    console.log("Car Models Response:", response.data);
                    data = response.data.map(item =>
                        item.model + " " +
                        item.company
                    ) || [];
                    console.log(data, "ddddaaaattttttaaaaa")
                    break;
                case 1:
                    const driveTypesResponse = await allDriveTypes();
                    data = driveTypesResponse.data.map(item => item.description) || [];
                    break;
                case 2:
                    const carTypesResponse = await allCarTypes();
                    data = carTypesResponse.data.map(item => item.description) || [];
                    break;
                case 3:
                    data = [...new Set(cars.map(car => car.numberOfSeats))];
                    break;
                case 4:
                    data = [...new Set(cars.map(car => car.city))];
                    break;
                default:
                    console.warn("Unknown filter type");
            }
            setCurrentFilterData(data);
        } catch (error) {
            console.error("Error fetching filter data:", error);
        }
    };

    const filters = [
        { label: "דגם", value: 0 },
        { label: "סוג הנעה", value: 1 },
        { label: "סוג רכב", value: 2 },
        { label: "מספר מקומות", value: 3 },
        { label: "עיר", value: 4 },
    ];

    const getDriveTypeIcon = (driveType) => {
        switch (driveType) {
            case 'דלק':
                return <Fuel />;
            case 'סולר':
                return <Truck />;
            case 'גז':
                return <Flame />;
            case 'חשמל':
                return <Bolt />;
            case 'היברידי':
                return <RefreshCcw />;
            default:
                return <HelpCircle />;
        }
    };

    return (
        <>
            <SearchCombo
                filters={filters}
                fetchFilterData={fetchFilterData}
                filterData={currentFilterData}
                fetchResultsFromServer={fetchCars}
            />
            {console.log(user.usersTypeId)}
            {user.usersTypeId === "67951e432b447fb00a5c9e86" && <div style={{ marginLeft: "50%" }}>
                <Button icon="pi pi-plus" onClick={() => navigate('addCar')} tooltip="הוספת רכב" tooltipOptions={{ position: "top" }} />
            </div>}

            <div className="allCards">
                {cars && cars.map((car, index) => (
                    <Card key={index} className="card" style={{ borderColor: car.isAvailable ? 'rgb(81, 246, 81)' : 'rgb(237, 107, 107)' }}>
                        <div className="card-body">
                            <div className="card-img">
                                <img src={`${process.env.REACT_APP_PUBLIC_URL}${car.image}`} alt={car.carModelsId.company} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                            </div>
                            <h2>{car.carModelsId.company}</h2>
                            <h3>{car.carModelsId.model}</h3>
                            <h4>{car.carModelsId.carTypesId.description}</h4>
                            <span className="drive-type-icon" data-pr-tooltip={car.driveTypesId.description} data-pr-position="top">{getDriveTypeIcon(car.driveTypesId.description)}</span>
                            <Tooltip target=".drive-type-icon" />
                            <p className="text-gray-600">{car.numberOfSeats} מספר מקומות</p>
                            <p>{car.street}, {car.city}</p>
                            <Button label="לפרטים נוספים והשאלה" icon="pi pi-info-circle" className="p-button-rounded p-button-text" onClick={() => {
                                navigate("carDetails", { state: { car } });
                            }} />
                            {car.isAvailable && user.usersTypeId === "67951e432b447fb00a5c9e86" && (
                                <div className='manager'>
                                    <Tooltip target=".pi-trash" content="מחיקת רכב" position="top" />
                                    <Link to={`deleteCar/${car._id}`}> <i className="pi pi-trash" style={{ fontSize: '1rem', color: 'red' }}></i></Link>
                                    <Tooltip target=".pi-pencil" content="עדכון רכב" position="top" />
                                    <Link to="updateCar" state={{ car }}><i className="pi pi-pencil" style={{ fontSize: '1rem', color: 'blue' }}></i></Link>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
            <Outlet />
        </>
    );
};
