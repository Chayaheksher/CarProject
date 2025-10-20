import axios from 'axios';
export const signIn = (userId, userPhone, userPassword) => {
    try {
        return axios.get(`http://localhost:3030/sign/${userId}/${userPhone}/${userPassword}`);
    } catch {
        return null;
    }
}

export const signUp = (user) => {
    try {
        return axios.post(`http://localhost:3030/sign`, user);
    } catch {
        return null;
    }
}

export const allCars = (filterType, query) => {
    try {
        return axios.get(`http://localhost:3030/displayCars?filterType=${filterType}&params=${encodeURIComponent(query)}`);
    } catch {
        return null;
    }
}

export const updateCar = (car, token) => {
    try {
        if (!token) {
            return false;
        }
        let headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        };
        return axios.patch(`http://localhost:3030/displayCars/${car.get('_id')}`, car, { headers });
    } catch (error) {
        console.error("Error updating car:", error);
        return null;
    }
};

export const addCar = (car, token) => {
    try {
        if (!token) {
            return false;
        }

        let headers = {
            Authorization: `Bearer ${token}`
        };

        return axios.post('http://localhost:3030/displayCars', car, { headers });
    } catch (error) {
        console.error("שגיאה בבקשה להוספת רכב:", error);
        return null;
    }
};

export const deleteTheCar = (carId, token) => {
    try {
        if (!token) {
            return false
        }
        let headers = {
            Authorization: `Bearer ${token}`
        }
        return axios.delete(`http://localhost:3030/displayCars/${carId}`, {headers});
    } catch {
        return null;
    }
}

export const allCarModels = () => {
    try {
        return axios.get('http://localhost:3030/carModels');
    } catch {
        return null;
    }
}

export const allDriveTypes = () => {
    try {
        return axios.get('http://localhost:3030/driveType/allDriveType');
    } catch {
        return null;
    }
}

export const updateDriveType = (driveType, token) => {
    try {
        if (!token) {
            return false
        }
        let headers = {
            Authorization: `Bearer ${token}`
        }
        return axios.patch(`http://localhost:3030/driveType/${driveType._id}`, driveType, {headers});
    } catch {
        return null;
    }
}

export const addNewModel = (model, token) => {
    try {
        if (!token) {
            return false
        }
        let headers = {
            Authorization: `Bearer ${token}`
        }
        return axios.post('http://localhost:3030/carModels', model, {headers});
    } catch {
        return null;
    }
}

export const allCarTypes = () => {
    try {
        return axios.get('http://localhost:3030/displayCars/allCarTypes');
    } catch {
        return null;
    }
}

export const allBorrows = (userId, token) => {
    try {
        if (!token) {
            return false
        }
        let headers = {
            Authorization: `Bearer ${token}`
        }
        return axios.get(`http://localhost:3030/displayBorrows?userId=${userId}`, {headers});
    } catch {
        return null;
    }
}

export const addBorrow = (borrow, token) => {
    try {
        if (!token) {
            return false
        }
        let headers = {
            Authorization: `Bearer ${token}`
        }
        return axios.post('http://localhost:3030/borrowsAndReturns', borrow, {headers});
    } catch {
        return null;
    }
}

export const returnBorrow = (returnB, token) => {
    try {
        if (!token) {
            return false
        }
        let headers = {
            Authorization: `Bearer ${token}`
        }
        return axios.post("http://localhost:3030/borrowsAndReturns/return", returnB, {headers});
    } catch {
        return null;
    }
}
