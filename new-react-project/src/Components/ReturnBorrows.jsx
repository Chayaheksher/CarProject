// import React, { useState, useEffect } from "react";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { Dialog } from 'primereact/dialog';
// import swal from "sweetalert";
// import { useLocation, useNavigate } from "react-router"
// // import '../Styles/SignStyle.css';
// import { InputNumber } from "primereact/inputnumber";
// import { RadioButton } from 'primereact/radiobutton';
// import { InputMask } from "primereact/inputmask";
// import '../Styles/BorrowStyle.css';
// import { returnBorrow } from "./api";
// import { useSelector } from "react-redux";


// export const ReturnBorrows = () => {
//     const navigate = useNavigate()
//     const location = useLocation()
//     const borrow = location.state?.rowData;
//     const token = useSelector(state => state.user.token);
//     const send = (rB) => {
//         rB.preventDefault()
//         console.log(rB);

//         // const city = document.getElementById('CT').value;
//         // const street = document.getElementById('ST').value;
//         // const balance = document.getElementById('YD').value;
//         const totalPayable = calculatedPrice;
//         const identityOwner = Number(document.getElementById('identityOwner')?.value?.replace(/\D/g, '') || '0');
//         const creditCard = Number(document.getElementById('creditCard')?.value?.replace(/\D/g, '') || '0');
//         const validity = document.getElementById('validity')?.value || '';
//         const CVV = Number(document.getElementById('CVV')?.value || '0');

//         let return1 = {
//             borrowId: borrow._id, // חשוב לשלוח את מזהה ההשאלה
//             city: city,
//             street: street,
//             date: new Date().toISOString().split('T')[0], // תאריך עכשווי בפורמט YYYY-MM-DD
//             time: new Date().toTimeString().split(' ')[0], // שעה עכשווית בפורמט HH:MM:SS
//             balance: fuelBalance || 0,
//             totalPayable: totalPayable,
//             isPaidWithSaved: selectedPayment === "saved",
//             identityOfCreditOwner: identityOwner,
//             creditCardNumber: creditCard,
//             validity: validity,
//             CVV: CVV
//         };
//         let balanceValue = rB.target[2].value;
//         console.log('Balance Value:', balanceValue);
//         if (balanceValue) {
//             return1.balance = balanceValue;
//         } else {
//             return1.balance = 0; // או ערך ברירת מחדל אחר
//         }
//         if (!return1.city || !return1.street || isNaN(return1.balance)) {
//             swal('אויי!', 'מילוי כל השדות - חובה!', 'error')
//             return
//         }
//         returnBorrow(return1, token)
//             .then((res) => {
//                 console.log(res);
//                 swal(`הסכום ${calculatedPrice} התקבל בהצלחה`, 'הוחזרה השאלה', 'success')

//             })
//             .catch((err) => {
//                 swal(`שגיאה`, 'השאלה לא הוחזרה', 'error')
//                 console.log(err);
//             })
//         closeDialog();
//     }

//     const [isOpen, setIsOpen] = useState(false);

//     const closeDialog = () => {
//         setIsOpen(false)
//         navigate(`/displayBorrow`, { state: { updated: true } })
//     }
//     useEffect(() => {
//         if (!token) { navigate('/signIn'); return };
//         setIsOpen(true)
//     }, []);

//     const [calculatedPrice, setCalculatedPrice] = useState(null);
//     const [selectedPayment, setSelectedPayment] = useState('saved');

//     const calculatePrice = (event) => {
//         event.preventDefault(); // עוצר את שליחת הטופס כדי לחשב מחיר קודם

//         const dateParts = borrow.date.split("/");
//         const timeParts = borrow.time.split(":");

//         const borrowDateTime = new Date(
//             dateParts[2],
//             dateParts[1] - 1,
//             dateParts[0],
//             timeParts[0],
//             timeParts[1],
//             timeParts[2] || 0
//         );

//         const howmanyTime = Date.now() - borrowDateTime.getTime();
//         const minutesPassed = Math.floor(howmanyTime / (1000 * 60)); // חישוב דקות
//         const totalCost = (minutesPassed < 60)
//             ? borrow.carId.pricePerHour * (minutesPassed / 60) // חישוב לפי דקות
//             : Math.floor(minutesPassed / 60) * borrow.carId.pricePerHour; // חישוב לפי שעות אם עברו יותר מ-60 דקות

//         const fuelBalance = document.getElementById('YD').value; // לקח את יתרת הדלק שהוזנה
//         const usedFuel = borrow.carId.balanceInLiters - fuelBalance; // דלק שהשתמשו בו
//         let charge = 0;
//         let win = 0;

//         // חישוב דמי הדלק
//         if (usedFuel > 0) {
//             charge = usedFuel * borrow.carId.driveTypesId.pricePerLiter; // חיוב על דלק שהשתמשו בו
//         } else if (usedFuel < 0) {
//             win = Math.abs(usedFuel) * borrow.carId.driveTypesId.pricePerLiter; // זיכוי אם הדלק לא הוזן
//         }

//         setCalculatedPrice(totalCost + charge - win);
//     };

//     const [city, setCity] = useState('');
// const [street, setStreet] = useState('');
// const [fuelBalance, setFuelBalance] = useState(null);

// const isDisabled = !city || !street || fuelBalance === null || fuelBalance === '';

//     return <>
//         <Dialog header="החזרת השאלה" visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
//             <form onSubmit={rB => send(rB)}>
//                 <div>
//                     <label htmlFor="CT">עיר<span style={{ color: "red" }}> *</span></label>
//                     <InputText id="CT"
//                         placeholder="עיר"
//                         maxLength={30}
//                         required
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                     ></InputText>
//                 </div>
//                 <div>
//                     <label htmlFor="ST">רחוב<span style={{ color: "red" }}> *</span></label>
//                     <InputText id="ST"
//                         placeholder="רחוב"
//                         maxLength={30}
//                         required
//                         value={street}
//                         onChange={(e) => setStreet(e.target.value)}
//                     ></InputText>
//                 </div>
//                 <div>
//                     <label htmlFor="YD">יתרת דלק<span style={{ color: "red" }} > *</span></label>
//                     <InputNumber id="YD"
//                         placeholder="יתרת דלק"
//                         maxLength={10}
//                         required
//                         useGrouping={false}
//                         value={fuelBalance}
//                         onValueChange={(e) => setFuelBalance(e.value)}
//                     ></InputNumber>
//                 </div>
//                 {/* {calculatedPrice === null && (<Button type="button" label="חשב מחיר" onClick={calculatePrice} />)} */}
//                 <Button type="button" label="חשב מחיר" onClick={calculatePrice} disabled={isDisabled} />
//                 {calculatedPrice !== null && (
//                     <div>
//                         <h3>מחיר: {calculatedPrice} ₪</h3>
//                     </div>
//                 )}
//                 {calculatedPrice !== null && (
//                     <>
//                         <h3>בחירת תשלום</h3>
//                         <div className="payment-options">
//                             <div>
//                                 <RadioButton inputId="saved" name="payment" value="saved" onChange={(e) => setSelectedPayment(e.value)} checked={selectedPayment === "saved"} />
//                                 <label htmlFor="saved">חיוב בכרטיס אשראי שמור</label>
//                             </div>
//                             <div>
//                                 <RadioButton inputId="new" name="payment" value="new" onChange={(e) => setSelectedPayment(e.value)} checked={selectedPayment === "new"} />
//                                 <label htmlFor="new">חיוב בכרטיס אחר</label>
//                             </div>
//                         </div>

//                         {selectedPayment === "new" && (
//                             <div className="credit-card-form">
//                                 <div>
//                                     <label htmlFor="identityOwner">תעודת זהות בעל הכרטיס <span style={{ color: "red" }}> *</span></label>
//                                     <InputMask id="identityOwner" mask="999999999" placeholder="תעודת זהות בעל הכרטיס" required />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="creditCard">מס' כרטיס אשראי <span style={{ color: "red" }}> *</span></label>
//                                     <InputMask id="creditCard" mask="9999-9999-9999-9999" placeholder="מס' כרטיס אשראי" required />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="validity">תוקף <span style={{ color: "red" }}> *</span></label>
//                                     <InputMask id="validity" mask="99/99" placeholder="תוקף" required />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="CVV">CVV <span style={{ color: "red" }}> *</span></label>
//                                     <InputMask id="CVV" mask="999" placeholder="CVV" required />
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )}
//                 {calculatedPrice !== null && (
//                     <Button type="submit" label="אישור" />
//                 )}
//             </form>
//         </Dialog>
//     </>
// }
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router"
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from 'primereact/radiobutton';
import { InputMask } from "primereact/inputmask";
import '../Styles/BorrowStyle.css';
import { returnBorrow } from "./api";
import { useSelector } from "react-redux";


export const ReturnBorrows = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const borrow = location.state?.rowData;
    const token = useSelector(state => state.user.token);
    const [isOpen, setIsOpen] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState('saved');
    const send = (rB) => {
        rB.preventDefault()
        console.log(rB);
        const totalPayable = calculatedPrice;
        const identityOwner = Number(document.getElementById('identityOwner')?.value?.replace(/\D/g, '') || '0');
        const creditCard = Number(document.getElementById('creditCard')?.value?.replace(/\D/g, '') || '0');
        const validity = document.getElementById('validity')?.value || '';
        const CVV = Number(document.getElementById('CVV')?.value || '0');

        let return1 = {
            borrowId: borrow._id,
            city: city,
            street: street,
            date: new Date().toISOString().split('T')[0], // תאריך עכשווי בפורמט YYYY-MM-DD
            time: new Date().toTimeString().split(' ')[0], // שעה עכשווית בפורמט HH:MM:SS
            balance: fuelBalance || 0,
            totalPayable: totalPayable,
            isPaidWithSaved: selectedPayment === "saved",
            identityOfCreditOwner: identityOwner,
            creditCardNumber: creditCard,
            validity: validity,
            CVV: CVV
        };
        let balanceValue = rB.target[2].value;
        console.log('Balance Value:', balanceValue);
        if (balanceValue) {
            return1.balance = balanceValue;
        } else {
            return1.balance = 0;
        }
        if (!return1.city || !return1.street || isNaN(return1.balance)) {
            swal('אויי!', 'מילוי כל השדות - חובה!', 'error')
            return
        }
        returnBorrow(return1, token)
            .then((res) => {
                console.log(res);
                if(calculatedPrice>0)
                swal(`הסכום ${calculatedPrice} התקבל בהצלחה`, 'הוחזרה השאלה', 'success')
            else{
                swal(`חשבונך זוכה בסכום ${(calculatedPrice*-1)} `, 'הוחזרה השאלה', 'success')
            }

            })
            .catch((err) => {
                swal(`שגיאה`, 'השאלה לא הוחזרה', 'error')
                console.log(err);
            })
        closeDialog();
    }
    const closeDialog = () => {
        setIsOpen(false)
        navigate(`/displayBorrow`, { state: { updated: true } })
    }
    useEffect(() => {
        if (!token) { navigate('/signIn'); return };
        setIsOpen(true)
    }, []);

    const calculatePrice = (event) => {
        event.preventDefault();

        const dateParts = borrow.date.split("/");
        const timeParts = borrow.time.split(":");

        const borrowDateTime = new Date(
            dateParts[2],
            dateParts[1] - 1,
            dateParts[0],
            timeParts[0],
            timeParts[1],
            timeParts[2] || 0
        );

        const howmanyTime = Date.now() - borrowDateTime.getTime();
        const minutesPassed = Math.floor(howmanyTime / (1000 * 60)); // חישוב דקות
        const totalCost = (minutesPassed < 60)
            ? borrow.carId.pricePerHour * (minutesPassed / 60) // חישוב לפי דקות
            : Math.floor(minutesPassed / 60) * borrow.carId.pricePerHour; // חישוב לפי שעות אם עברו יותר מ-60 דקות

        // const fuelBalance = document.getElementById('YD').value; // לקח את יתרת הדלק שהוזנה
        // const usedFuel = +borrow.carId.balanceInLiters - fuelBalance; // דלק שהשתמשו בו
        let charge = 0;
        let win = 0;

        // חישוב דמי הדלק
        if (fuelBalance > +borrow.carId.balanceInLiters) {
            win = (fuelBalance - (+borrow.carId.balanceInLiters)) * borrow.carId.driveTypesId.pricePerLiter
        }
        else {
            charge = (+borrow.carId.balanceInLiters - fuelBalance) * borrow.carId.driveTypesId.pricePerLiter
        }

        setCalculatedPrice(totalCost + charge - win);
    };

    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [fuelBalance, setFuelBalance] = useState(null);

    const isDisabled = !city || !street || fuelBalance === null || fuelBalance === '';

    return <>
        <Dialog header="החזרת השאלה" visible={isOpen} onHide={closeDialog} className="dia signin-dialog">
            <form onSubmit={rB => send(rB)}>
                <div>
                    <label htmlFor="CT">עיר<span style={{ color: "red" }}> *</span></label>
                    <InputText id="CT"
                        placeholder="עיר"
                        maxLength={30}
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></InputText>
                </div>
                <div>
                    <label htmlFor="ST">רחוב<span style={{ color: "red" }}> *</span></label>
                    <InputText id="ST"
                        placeholder="רחוב"
                        maxLength={30}
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    ></InputText>
                </div>
                <div>
                    <label htmlFor="YD">יתרת דלק<span style={{ color: "red" }} > *</span></label>
                    <InputNumber id="YD"
                        placeholder="יתרת דלק"
                        maxLength={10}
                        required
                        useGrouping={false}
                        value={fuelBalance}
                        onValueChange={(e) => setFuelBalance(e.value)}
                    ></InputNumber>
                </div>
                <Button type="button" label="חשב מחיר" onClick={calculatePrice} disabled={isDisabled} />
                {calculatedPrice !== null && (
                    <div>
                        <h3>מחיר: {calculatedPrice} ₪</h3>
                    </div>
                )}
                {calculatedPrice !== null && (
                    <>
                        <h3>בחירת תשלום</h3>
                        <div className="payment-options">
                            <div>
                                <RadioButton inputId="saved" name="payment" value="saved" onChange={(e) => setSelectedPayment(e.value)} checked={selectedPayment === "saved"} />
                                <label htmlFor="saved">חיוב בכרטיס אשראי שמור</label>
                            </div>
                            <div>
                                <RadioButton inputId="new" name="payment" value="new" onChange={(e) => setSelectedPayment(e.value)} checked={selectedPayment === "new"} />
                                <label htmlFor="new">חיוב בכרטיס אחר</label>
                            </div>
                        </div>

                        {selectedPayment === "new" && (
                            <div className="credit-card-form">
                                <div>
                                    <label htmlFor="identityOwner">תעודת זהות בעל הכרטיס <span style={{ color: "red" }}> *</span></label>
                                    <InputMask id="identityOwner" mask="999999999" placeholder="תעודת זהות בעל הכרטיס" required />
                                </div>
                                <div>
                                    <label htmlFor="creditCard">מס' כרטיס אשראי <span style={{ color: "red" }}> *</span></label>
                                    <InputMask id="creditCard" mask="9999-9999-9999-9999" placeholder="מס' כרטיס אשראי" required />
                                </div>
                                <div>
                                    <label htmlFor="validity">תוקף <span style={{ color: "red" }}> *</span></label>
                                    <InputMask id="validity" mask="99/99" placeholder="תוקף" required />
                                </div>
                                <div>
                                    <label htmlFor="CVV">CVV <span style={{ color: "red" }}> *</span></label>
                                    <InputMask id="CVV" mask="999" placeholder="CVV" required />
                                </div>
                            </div>
                        )}
                    </>
                )}
                {calculatedPrice !== null && (
                    <Button type="submit" label="אישור" />
                )}
            </form>
        </Dialog>
    </>
}