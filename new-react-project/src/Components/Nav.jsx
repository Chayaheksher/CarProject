import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../Styles/NavStyle.css';

export const Nav = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            <div className="nav-container">
                {/* לוגו בצד ימין שמוביל לדף הבית */}
                <Link to="/home" className="logo-container">
                    <img src="/CarLogo.jpg" alt="Car Logo" className="nav-logo" />
                </Link>

                {user && user.userName ? (
                    <span className="sign">
                        שלום, {user.userName} <i className="pi pi-user"></i>
                    </span>
                ) : (
                    <Link to="/signIn" className="sign">
                        <i className="pi pi-sign-in"></i>
                    </Link>
                )}
                
                {user.usersTypeId === "67951e432b447fb00a5c9e86" &&
                    <NavLink to='driveTypes' className="nav-item"> <i className="pi pi-bolt"></i> סוגי הנעה</NavLink>}
                {user.usersTypeId === "67951e432b447fb00a5c9e86" &&
                    <NavLink to='displayModels' className="nav-item"> <i className="pi pi-cog"></i> הצגת דגמים</NavLink>}
                <NavLink to='displayBorrow' className="nav-item"> <i className="pi pi-book"></i> הצגת השאלות</NavLink>
                <NavLink to='cars' className="nav-item"> <i className="pi pi-car"></i> רכבים</NavLink>
            </div>
        </>
    );
};
