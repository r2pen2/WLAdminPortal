// Style Imports
import './App.css';

// Component Imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import powerBrick from "./assets/images/power-brick.gif";
import { Text } from '@nextui-org/react';
import Navbar from './components/Navbar';
import { createContext, useState } from 'react';

export const CurrentSiteContext = createContext();

function App() {

  const [currentSite, setCurrentSite] = useState({
    title: "Test Site",
    logoSource: "https://beyondthebelleducation.com/static/media/logoTransparentBlack.79c1457b6c1da17b2b6a.png"
  })

  return (
    <CurrentSiteContext.Provider value={{currentSite, setCurrentSite}} >
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
    </CurrentSiteContext.Provider>
  );
}

export default App;
