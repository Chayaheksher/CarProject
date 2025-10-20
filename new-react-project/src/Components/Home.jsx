import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import '../Styles/HomeStyle.css';
import { useSelector } from 'react-redux';

export const Home = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const signIn = () => {
        navigate(`/signIn`);
    };

    const cars = [
        { name: "Toyota Corolla", image: "car9.png" },
        { name: "Ford Mustang", image: "car25.png" },
        { name: "BMW X5", image: "car26.png" }
    ];

    const carTemplate = (car) => (
        <div className="car-item" style={{ maxWidth: '20rem' }}>
            <img src={car.image} alt={car.name} style={{ width: "100%", borderRadius: "10px" }} />
            <h3>{car.name}</h3>
        </div>
    );

    return <>
        <div className="home-container">
            <div className="car-logo">
                <div className="title-box">
                    <h1>ברוכים הבאים להשכרת רכבים</h1>
                </div>            </div>
            <Carousel value={cars} itemTemplate={carTemplate} numVisible={1} numScroll={1} circular autoplayInterval={3000} />
            <div className="promo-section">
                <Card className="right-align" title="מבצע חורף - 10% הנחה!" subTitle="השכרה מעל שבוע">
                    <p>תפוס את הרכב שלך במחיר משתלם במיוחד לחורף.</p>
                </Card>
                <Card className="right-align" title="מבצע סוף שבוע" subTitle="השכרה מיום חמישי ועד ראשון">
                    <p>קבלו מחיר מיוחד לחופשת סוף השבוע!</p>
                </Card>
            </div>

            <div style={{ display: 'flex', justifySelf: 'center' }}>
                <Panel header="למה לבחור בנו?" style={{ width: '75rem' }} className="right-align teal-shadow">
                    <p>✔ מחירים משתלמים</p>
                    <p>✔ שירות לקוחות 24/6</p>
                    <p>✔ מגוון רחב של רכבים</p>
                </Panel>
            </div>
            {!user.token &&
                <Button label="התחברות / הרשמה" icon="pi pi-user" className="p-button-raised p-button-rounded sign-in-btn" onClick={signIn} />}
        </div>
    </>
}