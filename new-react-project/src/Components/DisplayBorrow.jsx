import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import '../Styles/BorrowStyle.css';
import { allBorrows } from './api';
import { useSelector } from 'react-redux';

export const DisplayBorrow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.user);
  const [borrow, serBorrow] = useState([]);
  useEffect(() => {
    if (!user?.token) {navigate('/signIn'); return}; // אם אין טוקן, הפונקציה תצא מיד
    if (location.state?.deleted || location.state?.updated || location.state?.added) {
      fetchBorrows();
    }
      fetchBorrows();
    
  }, [location.state]);

  const fetchBorrows = () => {    
    const userId = user.usersTypeId === "67951e432b447fb00a5c9e86" ? '' : user._id;
    
    allBorrows(userId, user.token)
      .then((res) => {
        serBorrow(res.data.borrows);
        console.log(res);
      })
      .catch((err) => console.error("Error fetching borrows:", err));
  };

  return <>
    <div className="tbl-container">
      <DataTable value={borrow} className="custom-table">
        <Column className='col' field="userId.userName" header="שם המשאיל"></Column>
        <Column className='col' field="carId.licenseNumber" header="לוחית רישוי"></Column>
        <Column
          className='col'
          field="date"
          header="תאריך השאלה"
          body={(rowData) => `${rowData.time} ${rowData.date}`}
        />
       {user.usersTypeId === "67951e432b447fb00a5c9e86" && 
        <Column
          className='col'
          field="returnDate"
          header="תאריך החזרה"
          body={(rowData) => rowData.returnDate!==null ? `${rowData.returnTime} ${rowData.returnDate}` : "הרכב עדיין בשימוש"}
        />}
        {user.usersTypeId === "67951e432b447fb00a5c9e86" && 
        <Column className='col' header="האם הוחזרה"
          body={(rowData) => (rowData.returnDate!==null ? <i className="pi pi-check" style={{ color: 'green' }}></i> : <i className="pi pi-times" style={{ color: 'red' }}></i>)} > 
          </Column>}
          
          {/* {user.usersTypeId === "67951e432b447fb00a5c9e87" &&  */}
        <Column className='col'
          body={(rowData) => (
            rowData.returnDate===null ? (
              <Button
                icon="pi pi-refresh"
                onClick={() => navigate("returnBorrows", { state: { rowData } })}
                tooltip="החזרת השאלה"
                tooltipOptions={{ position: "top" }}
              />
            ): ""
          )}
        ></Column>
        {/* } */}
      </DataTable>
    </div>
    <Outlet></Outlet>
  </>
}