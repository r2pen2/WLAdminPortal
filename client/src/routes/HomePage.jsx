import React, { useEffect, useState } from 'react'

import { Button, Text, Card, Divider, Spacer, } from "@nextui-org/react";

import "../assets/style/homepage.css"

import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';
import LocalFloristTwoToneIcon from '@mui/icons-material/LocalFloristTwoTone';
import { ContactModal } from '../components/Modals';
import { iconFills } from '../components/Modals';

import grayWaveTop from "../assets/images/gradient/GrayWaveTop.svg"
import grayWaveBottom from "../assets/images/gradient/GrayWaveBottom.svg"

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import { WLHeader, WLText, WLTextBlock } from "../libraries/Web-Legos/components/Text";

import {BeforeAndAfter, Testimonial} from "../api/siteModels.ts";

import { WLCenteredColumn, WLSpinnerPage } from "../libraries/Web-Legos/components/Layout"
import { WLImage } from '../libraries/Web-Legos/components/Images';
import home3 from "../assets/images/gradient/markup-cropped.svg"
import { WLAliceCarousel, WLAliceCarouselItem, createCarouselBreakpoints } from '../libraries/Web-Legos/components/Content';
import { SiteModel, fetchModelData, sortByOrder } from '../libraries/Web-Legos/api/models.ts';
import { AddModelButton, ModelEditButton, ModelEditModal } from '../libraries/Web-Legos/components/Modals';

const gradientPadding = {paddingLeft: ".5rem", paddingRight: ".5rem"}

export const textGradient = {textGradient: "0deg, $purple600 -20%, $pink600 100%"}

const userCanEditTestimonials = true;
const userCanEditText = true;
const userCanEditBeforesAndAfters = true;

export default function HomePage() {
  
  

  const [testimonialsFetched, setTestimonialsFetched] = useState(false);

  const [testimonials, setTestimonials] = useState([]);
  


  const quoteSvg = (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style={{borderRadius: "50%", border: "1px solid #d4d4d4", maxWidth: 50}}>
      <path fill="rgba(87,36,170,0.5)" d="M30,20.07C23.8,22.7,19.19,26.26,19.19,31.52c0,4.6,4.35,5.65,8.81,6.7.8.13,1.72,2,1.72,3.56,0,3.54-2.77,5.91-6.71,5.91-5.79,0-11.57-4.73-11.57-13.41,0-9.34,8.41-15.52,16.83-17.88Zm23.16,0C47,22.7,42.34,26.26,42.34,31.52c0,4.6,4.47,5.65,8.95,6.7.79.13,1.71,2,1.71,3.56,0,3.54-2.89,5.91-6.71,5.91-5.79,0-11.57-4.73-11.57-13.41,0-9.34,8.42-15.52,16.83-17.88Z"></path>
    </svg>
  )

  const quoteRightSvg = (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style={{transform:"scale(-1,1)", borderRadius: "50%", border: "1px solid #d4d4d4", maxWidth: 50}}>
      <path fill="rgba(87,36,170,0.5)" d="M30,20.07C23.8,22.7,19.19,26.26,19.19,31.52c0,4.6,4.35,5.65,8.81,6.7.8.13,1.72,2,1.72,3.56,0,3.54-2.77,5.91-6.71,5.91-5.79,0-11.57-4.73-11.57-13.41,0-9.34,8.41-15.52,16.83-17.88Zm23.16,0C47,22.7,42.34,26.26,42.34,31.52c0,4.6,4.47,5.65,8.95,6.7.79.13,1.71,2,1.71,3.56,0,3.54-2.89,5.91-6.71,5.91-5.79,0-11.57-4.73-11.57-13.41,0-9.34,8.42-15.52,16.83-17.88Z"></path>
    </svg>
  )

  function TestimonialCard({testimonial}) {
    return (
      <div className="p-2 gap-2 d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300, height: '100%', userSelect: "none"}}>
        <ModelEditButton model={Testimonial} data={testimonial} userCanEdit={userCanEditTestimonials} setCurrentModel={setCurrentModel} setEditModalOpen={setModelEditModalOpen}/>
        <div className="container-fluid d-flex flex-row">
          <div className="col-1 gap-2 d-flex flex-column align-items-center justify-content-between py-2">
            {quoteSvg}
          </div>
          <div className="col-10 p-2 gap-2 d-flex flex-column align-items-center justify-content-center">
            <Text align="center" size="$lg">
              {testimonial.message}
            </Text>
            <div className="w-100 d-flex flex-row align-items-center justify-content-center gap-2">
              <Text b>
                {testimonial.author}
              </Text>
              <div className="d-flex align-items-center justify-content-start gap-2">
                <Divider style={{width:"1rem"}} />
                { 
                  testimonial.virtual 
                  ? 
                    <ComputerTwoToneIcon style={{color: iconFills.blue}} />
                  : 
                    <LocationOnTwoToneIcon style={{color: iconFills.purple}} />
                }
              </div>
            </div>
          </div>
          <div className="col-1 gap-2 d-flex flex-column align-items-center justify-content-start py-2">
            {quoteRightSvg}
          </div>
        </div>
      </div>
    )
  }


  const [modelEditModalOpen, setModelEditModalOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState(new SiteModel());

  const [beforesAndAftersCarouselItems, setBeforesAndAftersCarouselItems] = useState([]);

  useEffect(() => {
    BeforeAndAfter.get().then((data) => {
      const sortedData = sortByOrder(data);
      let newItems = [];
      for (const item of sortedData) {
        newItems.push(<BeforeAndAfterCard beforeAndAfter={item} />);
      }
      setBeforesAndAftersCarouselItems(newItems)
    })
    Testimonial.getAndSet(setTestimonials, setTestimonialsFetched);
  }, [])

  // Initialize all states
  const [contactModalOpen, setContactModalOpen] = useState(false); // Whether contact modal is open

  const [whyItWorksHeaderLoaded, setWhyItWorksHeaderLoaded] = useState(false);            // Whether "Why This Model Works" header has loaded
  const [whyItWorksDescriptionLoaded, setWhyItWorksDescriptionLoaded] = useState(false);  // Whether "Why This Model Works" description has loaded
  const [saveHookLoaded, setSaveHookLoaded] = useState(false);                            // Whether "Save Money" hook has loaded
  const [saveDescriptionLoaded, setSaveDescriptionLoaded] = useState(false);              // Whether "Save Money" desctiption has loaded
  const [lookHookLoaded, setLookHookLoaded] = useState(false);                            // Whether "Looks Good" hook has loaded
  const [lookDescriptionLoaded, setLookDescriptionLoaded] = useState(false);              // Whether "Looks Good" description has loaded
  const [feelHookLoaded, setFeelHookLoaded] = useState(false);                            // Whether "Feels Good" hook has loaded
  const [feelDescriptionLoaded, setFeelDescriptionLoaded] = useState(false);              // Whether "Feels Good" description has loaded
  const [beforesAndAftersHeaderLoaded, setBeforesAndAftersHeaderLoaded] = useState(false);// Whether "Befores and Afters" header has loaded

  /**
   * A button scaled to the screen width that opens the {@link ContactModal}
   */
  function ScheduleButton() {
    
    /**
     * When the button is clicked, the contact modal should be opened
     */
    function handleScheduleButtonClick() {
      setContactModalOpen(true);
    }

    return (
        <Button className="w-100 d-inline mt-2" css={{minHeight: 50}} color="gradient" bordered size="$sm" onClick={handleScheduleButtonClick}>
          Schedule A Consultation
        </Button>
    )
  }
  
  function BeforeAndAfterCard({beforeAndAfter}) {
    return (
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{width: '100%', maxWidth: 1400}}>
        <ModelEditButton model={BeforeAndAfter} data={beforeAndAfter} userCanEdit={userCanEditBeforesAndAfters} setCurrentModel={setCurrentModel} setEditModalOpen={setModelEditModalOpen} />
        <div className="row">
          <Text>
            {beforeAndAfter.description}
          </Text>
          <Spacer y={1} />
        </div>
        <Divider/>
        <div className="row w-100 d-flex flex-row align-items-start justify-content-start py-2">
          <div className="p-2 col-xl-6 col-lg-12 d-flex flex-column align-items-end justify-content-start">
            <img src={beforeAndAfter.beforeSource} draggable={false} className="img-shadow no-select" alt="before-pic" style={{maxHeight: 500, width: "100%", height: "auto", objectFit: "contain"}} />
          </div>
          <div className="p-2 col-xl-6 col-lg-12 d-flex flex-column align-items-start justify-content-start">
            <img src={beforeAndAfter.afterSource} draggable={false} className="img-shadow no-select" alt="after-pic" style={{maxHeight: 500, width: "100%", height: "auto", objectFit: "contain"}} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <WLSpinnerPage 
      dependencies={[
        testimonialsFetched,
        beforesAndAftersHeaderLoaded, 
        whyItWorksHeaderLoaded, 
        whyItWorksDescriptionLoaded, 
        saveHookLoaded, 
        saveDescriptionLoaded, 
        lookHookLoaded, 
        lookDescriptionLoaded, 
        feelHookLoaded, 
        feelDescriptionLoaded
      ]}
    >
      <ModelEditModal model={currentModel} open={modelEditModalOpen} setOpen={setModelEditModalOpen} />
      <ContactModal open={contactModalOpen} setOpen={setContactModalOpen} />
      <section className="d-flex flex-column w-100 align-items-center">
        <div className="w-100 flex-column align-items-center background-image" style={{paddingTop: "10vh", paddingBottom: "40vh",}}>
          <div className="elevated d-flex flex-column w-100 text-background py-5">
            <WLHeader>
              You Can Do It Gardening
            </WLHeader>
            <WLHeader headerLevel={2} firestoreId="home-subtitle" editable={userCanEditText} />
          </div>
        </div>
        <img alt="leaf-line" src={home3} className="background-pattern" />
        <div className="elevated container-fluid" style={{marginTop: -250, marginBottom: 50}}>
          <div className="elevated row d-flex flex-row justify-content-center">
            <TransparentHookCard
              icon={<SavingsTwoToneIcon sx={{fontSize: 50}}/>} 
              titleText={<WLText firestoreId="save-money-hook" editable={userCanEditText} setLoaded={setSaveHookLoaded} />}
              subtitleText={<WLText firestoreId="save-money-description" editable={userCanEditText} setLoaded={setSaveDescriptionLoaded} />}
            />
            <TransparentHookCard
              icon={<VisibilityTwoToneIcon sx={{fontSize: 50}}/>} 
              titleText={<WLText firestoreId="looks-good-hook" editable={userCanEditText} setLoaded={setLookHookLoaded}/>}
              subtitleText={<WLText firestoreId="looks-good-description" editable={userCanEditText} setLoaded={setLookDescriptionLoaded}/>}
              />
            <TransparentHookCard
              icon={<LocalFloristTwoToneIcon sx={{fontSize: 50}}/>} 
              titleText={<WLText firestoreId="feels-good-hook" editable={userCanEditText} setLoaded={setFeelHookLoaded}/>}
              subtitleText={<WLText firestoreId="feels-good-description" editable={userCanEditText} setLoaded={setFeelDescriptionLoaded}/>}
            />
          </div>
        </div>
      </section>
      <section className='py-lg-5 py-2 d-flex flex-column align-items-center justify-content-center'>
        <div className="container d-flex flex-row justify-content-center align-items-center">
          <div className="row w-100 justify-content-center">
            <div className="col-xl-6 col-md-12 p-2 d-flex flex-row justify-content-center align-items-center">
              <WLImage firestoreId="jess" shadow round editable={userCanEditText} imgClasses="jess-image" />
            </div>
            <div className="col-xl-6 col-md-12 d-flex flex-column px-1 py-1 px-lg-5 py-3 px-lg-5 justify-content-around" style={{maxWidth: 750}}>
              <div>
                <WLHeader headerLevel={2} editable={userCanEditText} firestoreId="why-it-works-header" setLoaded={setWhyItWorksHeaderLoaded}/>
                <WLTextBlock firestoreId="why-it-works" editable={userCanEditText} setLoaded={setWhyItWorksDescriptionLoaded}/>
              </div>
              <ScheduleButton />
            </div>
          </div>
        </div>
      </section>
      <img src={grayWaveTop} alt="gray-wave-top" style={{width: "100%", objectFit: "cover"}} />
      <section className='d-flex flex-column align-items-center justify-content-center' style={{backgroundColor: "#F5F5F5"}}>
        <WLHeader color="#481379" firestoreId="testimonial-quotes-header" editable={userCanEditText} />
        <div className="d-flex flex-column align-items-center justify-content-center px-xxl-5 px-xl-4 px-md-3 px-2" style={{width: "100%", overflow: "visible"}}>
          <WLAliceCarousel
            scaleActive
            paginationTop
            pagination
            breakpoints={createCarouselBreakpoints(1, null, 2, null, 3)}
            items={testimonials.map((t, i) => <TestimonialCard testimonial={t} key={i} />)}
          />
        </div>
        <AddModelButton userCanEdit={userCanEditTestimonials} model={Testimonial} setCurrentModel={setCurrentModel} setEditModalOpen={setModelEditModalOpen} />
      </section>
      <img src={grayWaveBottom} alt="gray-wave-top" style={{width: "100%", objectFit: "cover"}} />
      <section className='d-flex flex-column align-items-center justify-content-center py-5'>
        <WLHeader firestoreId="befores-and-afters-header" setLoaded={setBeforesAndAftersHeaderLoaded} editable={userCanEditText}/>
        <WLAliceCarousel
          pagination
          buttonBlock
          paginationTop
          items={beforesAndAftersCarouselItems}
        />
        <AddModelButton userCanEdit={userCanEditTestimonials} model={BeforeAndAfter} setCurrentModel={setCurrentModel} setEditModalOpen={setModelEditModalOpen} />
      </section>
    </WLSpinnerPage>
  )
}

function TransparentHookCard({icon, titleText, subtitleText}) {
  return (
    <div className="col-xl-4 col-md-12 p-3 d-flex flex-column align-items-center">
      <div
        className='transparent-card'
      >
          <div className="d-flex flex-column w-100 align-items-center">
            {icon}
            {titleText}
          </div>
        <Divider />
        <div className="d-flex flex-column w-100 align-items-center">
          {subtitleText}
        </div>
      </div>
    </div>
  )
}