import { Route, Routes } from "react-router"
import { Home } from "./Home"
import { Cars } from "./Cars"
import { DisplayBorrow } from "./DisplayBorrow"
import { DisplayModels } from "./DisplayModels"
import { DriveTypes } from "./DriveTypes"
import { MakeBorrow } from "./MakeBorrow"
import { SignIn } from "./SignIn"
import { SignUp } from "./SignUp"
import { AddCar } from "./AddCar"
import { ReturnBorrows } from "./ReturnBorrows"
import { DeleteCar } from "./DeleteCar"
import { UpdateCar } from "./UpdateCar"
import { CarDetails } from "./CarDetails"
import { AddModel } from "./AddModel"
import { UpdateDrivePrice } from "./UpdateDrivePrice"

export const Routing = () => {
    return<>
    <Routes>
        <Route path="" element={<Home></Home>}></Route>
        <Route path="home" element={<Home></Home>}></Route>
        <Route path="signIn" element={<SignIn></SignIn>}></Route>
        <Route path="signUp" element={<SignUp></SignUp>}></Route>
        <Route path="cars" element={<Cars></Cars>}>
        <Route path="carDetails" element={<CarDetails></CarDetails>}></Route>
        <Route path="addCar" element={<AddCar></AddCar>}></Route>
        <Route path="deleteCar/:carId" element={<DeleteCar></DeleteCar>}></Route>
        <Route path="updateCar" element={<UpdateCar></UpdateCar>}></Route>
        </Route>
        <Route path="displayBorrow" element={<DisplayBorrow></DisplayBorrow>}>
        <Route path="returnBorrows" element={<ReturnBorrows></ReturnBorrows>}></Route>
        </Route>
        <Route path="displayModels" element={<DisplayModels></DisplayModels>}>
        <Route path="addModel" element={<AddModel></AddModel>}></Route>
        </Route>
        <Route path="driveTypes" element={<DriveTypes></DriveTypes>}>
        <Route path="updateDrivePrice" element={<UpdateDrivePrice></UpdateDrivePrice>}></Route>
        </Route>
        <Route path="makeBorrow" element={<MakeBorrow></MakeBorrow>}></Route>
        <Route path="*" element={<Home></Home>}></Route>
    </Routes>
    </>
}