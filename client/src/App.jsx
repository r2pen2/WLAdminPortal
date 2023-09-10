// Style Imports
import './App.css';

// Component Imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import powerBrick from "./assets/images/power-brick.gif";
import { Text } from '@nextui-org/react';
import Navbar from './components/Navbar';
import { createContext, useState } from 'react';
import { AvailableSite } from './api/siteModels.ts';

export const CurrentSiteContext = createContext();
export const UserSitesContext = createContext();


const BTB = AvailableSite.examples.default;
const YCD = AvailableSite.examples.alternate;

function App() {

  const [userSites, setUserSites] = useState([BTB, YCD]);

  const [currentSite, setCurrentSite] = useState(BTB)

  return (
    <CurrentSiteContext.Provider value={{currentSite, setCurrentSite}} >
    <UserSitesContext.Provider value={{userSites, setUserSites}} >
      <div className="App d-flex flex-column align-items-center w-100">
        <Router>
          <div className="app-content">
            <Navbar />
            <section className="d-flex flex-column align-items-center justify-content-center" style={{height: "100vh"}}>
              <img src={powerBrick} alt="power-brick" />
              <Text h1>BP-10700</Text>
            </section>
              <Routes>
                {/** Place Routes Here */}
              </Routes>
            {/** Place Footer Here */}
          </div>
        </Router>
      </div>
    </UserSitesContext.Provider>
    </CurrentSiteContext.Provider>
  );
}

export default App;
