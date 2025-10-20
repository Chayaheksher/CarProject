import './App.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BrowserRouter } from 'react-router';
import { Routing } from './Components/Routing';
import { Nav } from './Components/Nav';
import "./index.css";
import { Provider } from 'react-redux';
import store from './Redux/store';

function App() {
  return <>
    <Provider store={store}>
      <BrowserRouter>
        <Nav></Nav>
        <Routing></Routing>
      </BrowserRouter>
    </Provider>
  </>
}

export default App;
