// Library Imports
import { Button } from '@nextui-org/react';
import { createContext, useState, useEffect } from 'react';

// Style Imports
import './App.css';

// API Imports
import { AvailableSite, SiteModule } from './libraries/Web-Legos/api/admin.ts';
import { AuthenticationManager, WLPermissionsConfig } from './libraries/Web-Legos/api/auth.ts';

// Component Imports
import Navbar from './components/Navbar';
import TabNavbar from './components/TabNavbar';
import { WLHeader } from './libraries/Web-Legos/components/Text';

// Routes / Tabs
import SiteHome from './tabs/SiteHome';
import SiteAnalytics from './tabs/SiteAnalytics';
import SiteLog from './tabs/SiteLog';
import SiteForms from './tabs/SiteForms';
import SiteUsers from './tabs/SiteUsers';

/** Context to keep track of the current site */
export const CurrentSiteContext = createContext();
/** Context to keep track of sites this current user has access to */
export const UserSitesContext = createContext();
/** Context to keep track of the current tab */
export const CurrentTabContext = createContext();
/** Context to keep track of the current tab */
export const CurrentUserContext = createContext();

/** For development— BTB site data */
const BTB = AvailableSite.examples.default;
/** For development— YCD site data */
const YCD = AvailableSite.examples.alternate;

function App() {

  // Create states to place in Contexts
  const [userSites, setUserSites] = useState([BTB, YCD]); // Sites that the current user can access
  const [currentSite, setCurrentSite] = useState(BTB)     // The current site
  const [currentUser, setCurrentUser] = useState(null);   // The current user
  const [currentTab, setCurrentTab] = useState("HOME");   // The current tab

  /**
   * Pick the right tab to render given {@link CurrentTabContext}
   */
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

  /** AuthenticationManager for WLAdminPortal */
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
    new WLPermissionsConfig({})
  );
  authenticationManager.initialize();

  /**
   * @async
   * Sign in the current user with Google
   */
  async function handleSignIn() {
    const user = await authenticationManager.signInWithGoogle();
    setCurrentUser(user);
  }

  // Update sign-in state on authentication change
  useEffect(() => {
    authenticationManager.auth.onAuthStateChanged(u => {
      setCurrentUser(u);
    })
  }, [authenticationManager.auth])

  // If ever the currentSite changes, bring us HOME
  useEffect(() => { setCurrentTab("HOME"); }, [currentSite]);

  // If there's no current user signed in, display a centered "Sign In" button
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

  // Admin portal let's goooooooo
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
