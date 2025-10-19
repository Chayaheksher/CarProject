import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Outlet, useLocation } from 'react-router-dom';
import '../Styles/BorrowStyle.css';
import { useNavigate } from 'react-router-dom';
import { allDriveTypes } from './api.js';
import { useSelector } from 'react-redux';

export const DriveTypes = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const location = useLocation();
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        if (!token) { navigate('/signIn'); return };
        fetchDriveTypes();
        if (location.state?.added || location.state?.updated)
            fetchDriveTypes();
    }, [location.state]);
    const fetchDriveTypes = () => {
        allDriveTypes(token)
            .then((res) => {
                setData(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return <>
        {/* <h1 style={{ textAlign: 'center', color: 'teal', margin: '20px 0', fontSize: '2.5rem' }}>סוגי הנעת רכב</h1> */}
        <div className="tbl-container">
            <DataTable value={data} className="custom-table">
                <Column className='col' field="description" header="תיאור"></Column>
                <Column className='col' field="pricePerLiter" header="מחיר לליטר"></Column>
                <Column className='col' body={(rowData) => <Button icon="pi pi-pencil" onClick={() => (navigate("updateDrivePrice", { state: { rowData } }))} tooltip='עדכון מחיר' tooltipOptions={{ position: "top" }} />}></Column>
            </DataTable>
            <Outlet></Outlet>
        </div>
    </>
}