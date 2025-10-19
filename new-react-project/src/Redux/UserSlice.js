import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    _id: "",
    userName: "",
    identity: "",
    phone: "",
    creditCardNumber: "",
    CVV: "",
    validity: "",
    password: "",
    usersTypeId: "",
    borrows: [],
    token: "",
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state, action) => {
            return { ...state, ...action.payload };
        },
        setToken: (state, action) => {
            state.token = action.payload; // עדכון הטוקן
        },
    }
})

export const {setUser, setToken} = userSlice.actions
export default userSlice.reducer