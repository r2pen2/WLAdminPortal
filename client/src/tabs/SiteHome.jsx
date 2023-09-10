import React from 'react'
import { CurrentSiteContext, CurrentTabContext } from '../App'
import { SiteModule, siteModules } from '../libraries/Web-Legos/api/admin.ts';
import { Card, Text } from "@nextui-org/react"
import { WLHeader, WLText } from "../libraries/Web-Legos/components/Text";
import InsightsIcon from '@mui/icons-material/Insights';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { VerticalDivider } from "../libraries/Web-Legos/components/Layout"

export default function SiteHome() {

  const {currentSite} = React.useContext(CurrentSiteContext);
  const {currentTab, setCurrentTab} = React.useContext(CurrentTabContext);

  function ModuleButton({siteModule}) {
    
    function renderIcon() {
      switch(siteModule) {
        case SiteModule.analytics:
          return <InsightsIcon style={{fontSize: 64}}/>;
        case SiteModule.users:
          return <PeopleIcon style={{fontSize: 64}}/>;
        case SiteModule.forms:
          return <AssignmentIcon style={{fontSize: 64}}/>;
        default:
          return;
      }
    }

    function getModuleText() {
      switch(siteModule) {
        case SiteModule.analytics:
          return "Analytics";
        case SiteModule.users:
          return "Manage Users";
        case SiteModule.forms:
          return "Forms";
        default:
          return;
      }
    }

    function getModuleDescription() {
      switch(siteModule) {
        case SiteModule.analytics:
          return "Get insights on your website— how many people are viewing my page? Where are they from?";
        case SiteModule.users:
          return "Modify who has the ability to edit your website.";
        case SiteModule.forms:
          return "Access and review all data submitted through the forms on your website.";
        default:
          return;
      }
    }

    return (
      <div className="py-2 px-md-2 col-xl-4 col-lg-6 col-md-12" style={{height: 200}}>
        <Card 
          className="d-flex flex-row align-items-center justify-content-start px-3 gap-2 h-100" 
          isPressable 
          isHoverable
          onClick={() => setCurrentTab(siteModule)}  
        >
          {renderIcon()}
          <div className="px-0 px-lg-2" >
            <VerticalDivider height={40} color="#212529" />
          </div>
          <div className="d-flex flex-column align-items-start justify-content-center">
            <Text b>
              {getModuleText()}
            </Text>
            <Text align="left">
              {getModuleDescription()}
            </Text>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <section className="d-flex gap-2 flex-column align-items-center justify-content-center h-100">
      <div onClick={() => window.open(currentSite.url, "_blank")} style={{cursor: "pointer"}}>
        <WLHeader>
          {currentSite.title}
        </WLHeader>
      </div>
      <div className="container d-flex flex-column align-items-center">
        <div className="row w-100 d-flex flex-row align-items-center justify-content-center">
          {siteModules[currentSite.siteKey].sort().map((m, i) => {
            return <ModuleButton siteModule={m} key={i} />
          })}
        </div>
      </div>
    </section>
  )
}
