import React, { useContext } from 'react'
import { Navbar as NextUINavbar } from "@nextui-org/react"
import { CurrentSiteContext } from '../App'
import {WLNavBrandLeft, WLNavContent} from "../libraries/Web-Legos/components/Navigation";

export default function Navbar() {

  const { currentSite } = useContext(CurrentSiteContext)

  return (
    <NextUINavbar
      height="80px"
      variant="sticky"
      maxWidth="xl"
    >
      <WLNavContent>
        <WLNavContent.Left>
          <NextUINavbar.Toggle className="px-3" />
          <WLNavBrandLeft title={currentSite.title} source={currentSite.logoSource}/>
        </WLNavContent.Left>
      </WLNavContent>
    </NextUINavbar>
  )
}
