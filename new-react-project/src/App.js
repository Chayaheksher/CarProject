// import logo from './logo.svg';
import './App.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
// import 'primereact/resources/themes/lara-dark-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BrowserRouter } from 'react-router';
import { Routing } from './Components/Routing';
import { Nav } from './Components/Nav';
import "./index.css";
import { Provider } from 'react-redux';
import store from './Redux/store';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  

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
