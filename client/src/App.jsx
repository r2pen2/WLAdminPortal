// Style Imports
import './App.css';

// Component Imports
import {Navbar as NextUINavbar} from "@nextui-org/react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import powerBrick from "./assets/images/power-brick.gif";
import { Text } from '@nextui-org/react';
import Navbar from './components/Navbar';
import { createContext, useState } from 'react';
import { AvailableSite, SiteModule } from './libraries/Web-Legos/api/admin.ts';
import SiteHome from './tabs/SiteHome';
import SiteAnalytics from './tabs/SiteAnalytics';
import SiteForms from './tabs/SiteForms';
import SiteUsers from './tabs/SiteUsers';
import TabNavbar from './components/TabNavbar';

export const CurrentSiteContext = createContext();
export const UserSitesContext = createContext();
export const CurrentTabContext = createContext();

const BTB = AvailableSite.examples.default;
const YCD = AvailableSite.examples.alternate;

function App() {

  const [userSites, setUserSites] = useState([BTB, YCD]);
  const [currentSite, setCurrentSite] = useState(BTB)

  const [currentTab, setCurrentTab] = useState("HOME");

  function renderTab() {
    switch (currentTab) {
      case SiteModule.analytics:
        return <SiteAnalytics />;
      case SiteModule.forms:
        return <SiteForms />;
      case SiteModule.users:
        return <SiteUsers />;
      default:
        return <SiteHome />;
    }
  }

  return (
    <CurrentSiteContext.Provider value={{currentSite, setCurrentSite}} >
    <UserSitesContext.Provider value={{userSites, setUserSites}} >
    <CurrentTabContext.Provider value={{currentTab, setCurrentTab}} >
    <div className="App d-flex flex-column align-items-center w-100">
      <Navbar />
      <div className="d-flex d-md-none w-100">
        <NextUINavbar
          variant="sticky"
          maxWidth="xl"
        >
          <TabNavbar />
        </NextUINavbar>
      </div>
      <div className="app-content">
        { renderTab() }
      </div>
    </div>
    </CurrentTabContext.Provider>
    </UserSitesContext.Provider>
    </CurrentSiteContext.Provider>
  );
}

export default App;
