import React, { useState } from 'react'

import "../assets/style/services.css"

import { WLBlockHeader } from '../libraries/Web-Legos/components/Text';

import { blockHeaderFill } from "../assets/style/colors";
import { WLResponsiveSectionEditable, WLSpinnerPage } from '../libraries/Web-Legos/components/Layout';
import { WLImage } from '../libraries/Web-Legos/components/Images';

const userCanEditText = true;

export default function About() {
  
  const [aboutLoaded, setAboutLoaded] = useState(false);

  return (
  <WLSpinnerPage dependencies={[aboutLoaded]}>
    <WLBlockHeader text="About" color={blockHeaderFill} short />
    <WLResponsiveSectionEditable
      headerBlack
      setLoaded={setAboutLoaded}
      stackHeader 
      columnWidthLeft="8" 
      columnWidthRight="4" 
      editable={userCanEditText} 
      firestoreId="about" 
      image={
        <WLImage 
          editable={userCanEditText} 
          firestoreId="about" 
          shadow 
          imgCss={{
            height: "100%", 
            maxHeight: 600
          }}
        />
      }
    />
    </WLSpinnerPage>
  )
}