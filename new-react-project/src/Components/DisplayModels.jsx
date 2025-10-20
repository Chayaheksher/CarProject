import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import '../Styles/BorrowStyle.css';
import { allCarModels } from './api.js';
import { SearchCombo } from './SearchCombo.jsx';
import { useSelector } from 'react-redux';

export const DisplayModels = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [saveTheData, setSaveTheData] = useState([]);
    const location = useLocation();
    const token = useSelector(state => state.user.token);
    const [currentFilterData, setCurrentFilterData] = useState([]);
    useEffect(() => {
        if (!token) { navigate('/signIn'); return };
        if (location.state?.added || location.state?.updated)
            fetchModels();
        fetchModels()
    }, [location.state]);
    const fetchModels = () => {
        allCarModels(token)
            .then((res) => {
                setData(res.data);
                setSaveTheData(res.data)
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        console.log("Updated currentFilterData:", currentFilterData);
    }, [currentFilterData]);
    const fetchFilterData = async (filterType) => {
        try {
            let fData = [];
            switch (filterType) {
                case 0:
                    fData = [...new Set(data.map(d => d.company))];
                    console.log(fData, "fData")
                    break;
                case 1:
                    fData = [...new Set(data.map(d => d.carTypesId.description))];
                    break;
                default:
                    console.warn("Unknown filter type");
            }
            setCurrentFilterData(fData);
        } catch (error) {
            console.error("Error fetching filter data:", error);
        }
    };
    const filters = [
        { label: "חברה", value: 0 },
        { label: "סוג רכב", value: 1 },
    ];

    const filterFunc = (selectedFilter, value) => {
        if (selectedFilter === null && value === '') {
            fetchModels()
        }
        else {
            let filteredData = []
            switch (selectedFilter) {
                case 0:
                    filteredData = saveTheData.filter(x => x.company.includes(value))
                    break;
                case 1:
                    filteredData = saveTheData.filter(X => X.carTypesId.description.includes(value))
                    break
                default:
                    console.warn("Unknown filter type");
            }
            setData(filteredData)
        }
    }
    return <>
        <SearchCombo
            filters={filters}
            fetchFilterData={fetchFilterData}
            filterData={currentFilterData}
            fetchResultsFromServer={filterFunc}
        />
        <Button
            icon="pi pi-plus"
            onClick={() => { navigate('addModel') }}
            tooltip="הוספת דגם"
            tooltipOptions={{ position: "top" }}
            style={{ marginLeft: "50%", marginBottom: "0px" }}
        />
        <div className="tbl-container">
            <DataTable value={data} className="custom-table">
                <Column className='col' field="company" header="חברה"></Column>
                <Column className='col' field="model" header="דגם"></Column>
                <Column className='col' field="carTypesId.description" header="סוג רכב"></Column>
            </DataTable>
        </div>
        <Outlet></Outlet>
    </>
}