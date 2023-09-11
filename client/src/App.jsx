// Style Imports
import './App.css';

// Component Imports
import {Navbar as NextUINavbar} from "@nextui-org/react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import powerBrick from "./assets/images/power-brick.gif";
import { Text, Button } from '@nextui-org/react';
import Navbar from './components/Navbar';
import { createContext, useState, useEffect } from 'react';
import { AvailableSite, SiteModule } from './libraries/Web-Legos/api/admin.ts';
import SiteHome from './tabs/SiteHome';
import SiteAnalytics from './tabs/SiteAnalytics';
import SiteForms from './tabs/SiteForms';
import SiteUsers from './tabs/SiteUsers';
import TabNavbar from './components/TabNavbar';
import { AuthenticationManager, WLPermissionsConfig } from './libraries/Web-Legos/api/auth.ts';
import { WLHeader } from './libraries/Web-Legos/components/Text';
import SiteLog from './tabs/SiteLog';

export const CurrentSiteContext = createContext();
export const UserSitesContext = createContext();
export const CurrentTabContext = createContext();
export const CurrentUserContext = createContext();

const BTB = AvailableSite.examples.default;
const YCD = AvailableSite.examples.alternate;

function App() {

  const [userSites, setUserSites] = useState([BTB, YCD]);
  const [currentSite, setCurrentSite] = useState(BTB)

  const [currentUser, setCurrentUser] = useState(null);

  const [currentTab, setCurrentTab] = useState("HOME");

  function renderTab() {
    switch (currentTab) {
      case SiteModule.analytics:
        return <SiteAnalytics />;
      case SiteModule.forms:
        return <SiteForms />;
      case SiteModule.users:
        return <SiteUsers />;
      case SiteModule.log:
        return <SiteLog />;
      default:
        return <SiteHome />;
    }
  }


  const permissions = new WLPermissionsConfig({})

  const authenticationManager = new AuthenticationManager(
    {
      apiKey: "AIzaSyAWbFLjUXdBoarK-POQbiFFD6FT-YhdSac",
      authDomain: "wladminportal.firebaseapp.com",
      projectId: "wladminportal",
      storageBucket: "wladminportal.appspot.com",
      messagingSenderId: "76275437317",
      appId: "1:76275437317:web:d2a7ee5c7d964eb87b716c",
      measurementId: "G-61W670RMQR"
    },
    permissions
  );
  authenticationManager.initialize();

  async function handleSignIn() {
    const user = await authenticationManager.signInWithGoogle();
    setCurrentUser(user);
  }

  // Update sign-in state on authentication change
  useEffect(() => {
    authenticationManager.auth.onAuthStateChanged(u => {
      setCurrentUser(u);
    })
  }, [])

  useEffect(() => {
    setCurrentTab("HOME");
  }, [currentSite])

  if (!currentUser) {
    return <div className="App d-flex flex-column align-items-center justify-content-center" style={{height: "100vh"}}>
      <div className="app-content gap-2 d-flex flex-column align-items-center justify-content-center">
        <WLHeader>
          joed.dev Admin Portal
        </WLHeader>
        <Button flat onClick={handleSignIn}>
          Sign In
        </Button>
      </div>
    </div>
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}} >
    <CurrentSiteContext.Provider value={{currentSite, setCurrentSite}} >
    <UserSitesContext.Provider value={{userSites, setUserSites}} >
    <CurrentTabContext.Provider value={{currentTab, setCurrentTab}} >
    <div className="App d-flex flex-column align-items-center w-100">
      <Navbar />
      <div className="app-content">
        { renderTab() }
      </div>
      <Button flat onClick={() => authenticationManager.auth.signOut()}>
        Sign Out
      </Button>
    </div>
    <TabNavbar />
    </CurrentTabContext.Provider>
    </UserSitesContext.Provider>
    </CurrentSiteContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
