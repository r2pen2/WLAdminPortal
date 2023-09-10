import React from 'react'
import { CurrentSiteContext, CurrentTabContext } from '../App'
import { Navbar as NextUINavbar, Text } from "@nextui-org/react"
import { WLNavContent } from '../libraries/Web-Legos/components/Navigation'
import { SiteModule, siteModules } from '../libraries/Web-Legos/api/admin.ts'

export default function TabNavbar() {

  const {currentTab, setCurrentTab} = React.useContext(CurrentTabContext)
  const { currentSite } = React.useContext(CurrentSiteContext)

  const navbarToggleRef = React.useRef();
  const [isSideMenuOpen, setIsSideMenuOpen] = React.useState(false)

  

  function handleSideMenu(tab) {
    setCurrentTab(tab);
    isSideMenuOpen && navbarToggleRef.current.click();
  }

  

  function getTabName(t) {
    switch (t) {
      case SiteModule.analytics:
        return "Analytics";
      case SiteModule.users:
        return "Users";
      case SiteModule.forms:
        return "Forms";
      default:
        return;
    }
  }

  console.log(siteModules[currentSite.siteKey])

  return (
    <WLNavContent>
    <WLNavContent.Left>
      <div className="d-md-none d-flex">
        <NextUINavbar.Content>
            <NextUINavbar.Link 
              isActive={currentTab === "HOME"}
              onClick={() => setCurrentTab("HOME")}
            >
              Home
            </NextUINavbar.Link>
          {siteModules[currentSite.siteKey].sort().map((m, i) => { return (
            <NextUINavbar.Link 
              isActive={currentTab === m}
              onClick={() => setCurrentTab(m)}
            >
              {getTabName(m)}
            </NextUINavbar.Link>
          )
          })}
        </NextUINavbar.Content>
      </div>
    </WLNavContent.Left>
    <WLNavContent.Right>
      <div className="d-md-flex d-none">
        <NextUINavbar.Content>
            <NextUINavbar.Link 
              isActive={currentTab === "HOME"}
              onClick={() => setCurrentTab("HOME")}
            >
              Home
            </NextUINavbar.Link>
          {siteModules[currentSite.siteKey].sort().map((m, i) => { return (
            <NextUINavbar.Link 
              isActive={currentTab === m}
              onClick={() => setCurrentTab(m)}
            >
              {getTabName(m)}
            </NextUINavbar.Link>
          )
          })}
        </NextUINavbar.Content>
      </div>
    </WLNavContent.Right>
  </WLNavContent>
  )
}
