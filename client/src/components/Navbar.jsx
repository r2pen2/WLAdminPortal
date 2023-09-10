import React, { useContext, useEffect, useRef, useState } from 'react'
import { Divider, Link, Navbar as NextUINavbar, Text, Tooltip } from "@nextui-org/react"
import { CurrentSiteContext, UserSitesContext } from '../App'
import {WLNavBrandCenter, WLNavBrandLeft, WLNavContent} from "../libraries/Web-Legos/components/Navigation";

export default function Navbar() {

  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext)
  const { userSites } = useContext(UserSitesContext)
  
  const [status, setStatus] = useState(false);
  const [statusChecked, setStatusChecked] = useState(false);

  useEffect(() => {
    fetch(currentSite.url).then((response) => {
      setStatusChecked(true);
      setStatus(response.status === 200);
    }).catch(() => {
      setStatusChecked(true);
      setStatus(false);
    })
  }, [currentSite]);
  


  function getContentMessage() {
    if (!statusChecked) {
      return "Checking site status...";
    }
    return status ? `${currentSite.title} is currently online` : `${currentSite.title}  is currently offline`
  }
      
  function getStatusColor() {
    if (!statusChecked) {
      return "#C3841D";
    }
    return status ? "#18C964" : "#F31260";
  }
      
  function getTooltipColor() {
    if (!statusChecked) {
      return "warning";
    }
    return status ? "success" : "danger";
  };
  

  function StatusIcon() {

    return (
      <Tooltip showArrow={true} color={getTooltipColor()} content={getContentMessage()} placement="right">
          <div style={{
          borderRadius: "50%",
          height: 15,
          width: 15,
          backgroundColor: getStatusColor()
        }}/>
      </Tooltip>
    )
  }

  function getStatusBrief() {
    if (!statusChecked) {
      return "Checking Status...";
    }
    return status ? "Online" : "Offline"
  }

  const navbarToggleRef = useRef();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  function handleSideMenu(site) {
    setCurrentSite(site);
    isSideMenuOpen && navbarToggleRef.current.click();
  }

  return (
    <NextUINavbar
      variant="sticky"
      maxWidth="xl"
    >
      <WLNavContent>
        <WLNavContent.Left>
          <NextUINavbar.Toggle 
            className="px-3"
            ref={navbarToggleRef}
            onChange={(s) => setIsSideMenuOpen(s)}
            
          />
          <div className="d-none d-md-flex flex-row align-items-center justify-content-center w-100">          
            <WLNavBrandLeft title={currentSite.title} source={currentSite.logoSource} showIn="md"/>
            <Divider style={{width: 50}} className="mx-3" />
            <StatusIcon />
          </div>
        </WLNavContent.Left>
        <div className="d-flex d-md-none flex-column align-items-end justify-content-center w-100">          
          <WLNavBrandCenter title={currentSite.title} />
          <Text b color={getStatusColor()}>{getStatusBrief()}</Text>
        </div>
      </WLNavContent>
      <NextUINavbar.Collapse>
        {userSites.map((site, index) => (
          <NextUINavbar.CollapseItem key={index}>
            <div 
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                cursor: "pointer"
              }}
              onClick={() => handleSideMenu(site)}
            >
              <Text
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
              >
                {site.title}
              </Text>
            </div>
          </NextUINavbar.CollapseItem>
        ))}
      </NextUINavbar.Collapse>
    </NextUINavbar>
  )
}