// Library Imports
import { Button, Text, Tooltip } from '@nextui-org/react';
import { createContext, useState, useEffect } from 'react';
import InsightsIcon from '@mui/icons-material/Insights';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

// Style Imports
import './App.css';

// API Imports
import { AvailableSite, SiteModule } from './libraries/Web-Legos/api/admin.ts';
import { AuthenticationManager, User, WLPermissionsConfig } from './libraries/Web-Legos/api/auth.ts';



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
import { WLSpinnerPage } from './libraries/Web-Legos/components/Layout';

/** Context to keep track of the current site */
export const CurrentSiteContext = createContext();
/** Context to keep track of sites this current user has access to */
export const UserSitesContext = createContext();
/** Context to keep track of the current tab */
export const CurrentTabContext = createContext();
/** Context to keep track of the current tab */
export const CurrentUserContext = createContext();
/** Context to keep track whether we're running tests right now */
export const TestingContext = createContext();

/**
 * A testable App
 * @param {User} testUser - A user to run tests on
 * @param {AvailableSite[]} testSites - Test user's available sites
 */
export function App(props) {

  /** Whether this is a testing environment */
  const isTestingEnvironment = props.testUser || props.testSites;

  // Create states to place in Contexts
  const [userSites, setUserSites] = useState(props.testSites ? props.testSites : []);           // Sites that the current user can access
  const [currentSite, setCurrentSite] = useState(props.testSites ? props.testSites[0] : null)   // The current site
  const [currentUser, setCurrentUser] = useState(props.testUser ? props.testUser : null);       // The current user
  const [currentUserFetched, setCurrentUserFetched] = useState(isTestingEnvironment);           // The current user's fetched state
  const [currentTab, setCurrentTab] = useState("HOME");                                         // The current tab
  const [sitesFetched, setSitesFetched] = useState(isTestingEnvironment);                       // Whether sites have been fetched yet

  function getUserSites() {
    // If we're testing, don't do this
    if (isTestingEnvironment) { return; }

    if (!currentUser) { return; }
    setSitesFetched(false);
    AvailableSite.get(setSitesFetched).then((sites) => {
      let filteredUserSites = [];
      for (const site of sites) {
        if (site.users.includes(currentUser.email)) {
          site.siteKey = site.id;
          filteredUserSites.push(site);
        }
      }
      setUserSites(filteredUserSites);
      setCurrentSite(filteredUserSites[0])
    });
  }

  // Fetch user sites on login
  useEffect(getUserSites, [currentUser])

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
  }, [authenticationManager.auth, isTestingEnvironment])

  // If ever the currentSite changes, bring us HOME
  useEffect(() => { setCurrentTab("HOME"); }, [currentSite]);

  useEffect(() => {
    authenticationManager.auth.authStateReady().then(() => {
      setCurrentUserFetched(true);
    })
  }, [])

  function SignOutButton() {
    return (
      <Button flat onClick={() => authenticationManager.auth.signOut()} data-testid="sign-out-button">
        Sign Out
      </Button>
    )
  }

  function AppContent() {

    // If there's no current user signed in, display a centered "Sign In" button
    if (!currentUser) {
      return (
        <WLSpinnerPage dependencies={[currentUserFetched]}>
          <div data-testid="signed-out-page" className="App d-flex flex-column align-items-center justify-content-center" style={{height: "100vh"}}>
            <div className="app-content gap-2 d-flex flex-column align-items-center justify-content-center">
              <WLHeader data-testid="signed-out-header">
                joed.dev Admin Portal
              </WLHeader>
              <div className="d-flex flex-row gap-2 py-2">
                <Tooltip 
                  placement="top" 
                  content="See Analytics" 
                  data-testid="signed-out-analytics-tooltip"
                >
                  <InsightsIcon style={{fontSize: 48, color: "#D41D6D"}} data-testid="signed-out-analytics-icon"/>
                </Tooltip>
                <Tooltip 
                  placement="top" 
                  content="Manage Users"
                  data-testid="signed-out-users-tooltip"
                  >
                  <PeopleIcon style={{fontSize: 48, color: "#00AE17"}} data-testid="signed-out-users-icon"/>
                </Tooltip>
                <Tooltip 
                  placement="top" 
                  content="View Forms"
                  data-testid="signed-out-forms-tooltip"
                  >
                  <AssignmentIcon style={{fontSize: 48, color: "#1777F2"}} data-testid="signed-out-forms-icon"/>
                </Tooltip>
                <Tooltip 
                  placement="top" 
                  content="Monitor Changes"
                  data-testid="signed-out-changelog-tooltip"
                >
                  <EditIcon style={{fontSize: 48, color: "#AB2FD6"}} data-testid="signed-out-changelog-icon"/>
                </Tooltip>
              </div>
              <Button flat onClick={handleSignIn} data-testid="sign-in-button">
                Sign In
              </Button>
            </div>
          </div>
        </WLSpinnerPage>
      )
    }
    
    if (!currentSite) {
      // If there's no current site, the user isn't authorized on any sites.
      return (
        <WLSpinnerPage dependencies={[sitesFetched]}>
          <div data-testid="signed-in-no-sites-page" className="App d-flex flex-column align-items-center justify-content-center" style={{height: "100vh"}}>
            <div className="app-content gap-2 d-flex flex-column align-items-center justify-content-center">
              <SentimentDissatisfiedIcon sx={{fontSize: 128}} data-testid="signed-in-no-sites-glyph"/>
              <WLHeader>
                Oh no!
              </WLHeader>
              <Text>
                The email address "{currentUser.email}" doesn't have access to any sites.
              </Text>
              <Text>
              If you believe this to be an error, contact a site administrator or Joe Dobbelaar: <a href="mailto:joe@joed.dev">joe@joed.dev</a>
              </Text>
              <SignOutButton />
            </div>
          </div>
        </WLSpinnerPage>
      )
    }
    
    return (
      <div data-testid="signed-in-no-sites-page" className="App d-flex flex-column align-items-center justify-content-center" style={{height: "100vh", width: "100%"}}>
        <Navbar />
        <div className="app-content" data-testid="signed-in-tab-container">
          { renderTab() }
        </div>
        <SignOutButton />
        <TabNavbar />
      </div>
    )
  }

  // Admin portal let's goooooooo
  return (
    <TestingContext.Provider value={{isTestingEnvironment}} >
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}} >
    <CurrentSiteContext.Provider value={{currentSite, setCurrentSite}} >
    <UserSitesContext.Provider value={{userSites, setUserSites}} >
    <CurrentTabContext.Provider value={{currentTab, setCurrentTab}} >
      { 
        props.children ? props.children : 
        <WLSpinnerPage dependencies={[sitesFetched]}>
          <div className="App d-flex flex-column align-items-center w-100" data-testid="app">
            <AppContent />
          </div>
        </WLSpinnerPage>
      }
    </CurrentTabContext.Provider>
    </UserSitesContext.Provider>
    </CurrentSiteContext.Provider>
    </CurrentUserContext.Provider>
    </TestingContext.Provider>
  );
}

export default App;
