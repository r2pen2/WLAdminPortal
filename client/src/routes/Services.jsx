import React, { useState } from 'react'

import "../assets/style/services.css"
import { WLBlockHeader, WLText } from '../libraries/Web-Legos/components/Text';
import { WLResponsiveSectionEditable, WLSpinnerPage } from '../libraries/Web-Legos/components/Layout';

import { blockHeaderFill } from "../assets/style/colors";
import { Divider, Text } from '@nextui-org/react';
import { markdownToHTML } from '../libraries/Web-Legos/api/strings';
import { AddModelButton, ModelEditButton, ModelEditModal } from '../libraries/Web-Legos/components/Modals';
import { WLAliceCarousel, createCarouselBreakpoints } from '../libraries/Web-Legos/components/Content';
import { useEffect } from 'react';
import { TestimonialSlideshowPicture } from '../api/siteModels.ts';
import { SiteModel } from '../libraries/Web-Legos/api/models.ts';


const userCanEditTestimonials = true;
const userCanEditText = true;

export default function Services() {
  
  const [virtualLoaded, setVirtualLoaded] = useState(false);
  const [inPersonLoaded, setInPersonLoaded] = useState(false);

  const [slideshowItems, setSlideshowItems] = useState([]);
  const [slideshowItemsFetched, setSlideshowItemsFetched] = useState(false);

  
  const [currentModel, setCurrentModel] = useState(new SiteModel());
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    TestimonialSlideshowPicture.getAndSet(setSlideshowItems, setSlideshowItemsFetched);
  }, [])

  
  function SlideshowItemCard({testimonialSlideshowPicture}) {
    return (
      <div className="p-2 p-lg-4 gap-2 d-flex flex-column align-items-center justify-content-center" style={{height: '100%', userSelect: "none"}}>
        <ModelEditButton solid model={TestimonialSlideshowPicture} data={testimonialSlideshowPicture} userCanEdit={userCanEditTestimonials} setCurrentModel={setCurrentModel} setEditModalOpen={setEditModalOpen}/>
        <div style={{filter: "drop-shadow(1px 1px 24px white)"}}>
          <Text>
            {testimonialSlideshowPicture.caption}
          </Text>
        </div>
        <Divider />
        <img className="no-select img-shadow" src={testimonialSlideshowPicture.imageSource} alt="slideshow-item" style={{borderRadius: "1rem", width: '100%', height: '100%', objectFit: "contain"}}/>
      </div>
    )
  }

  return (
  <WLSpinnerPage dependencies={[virtualLoaded, inPersonLoaded, slideshowItemsFetched]}>
    <ModelEditModal open={editModalOpen} setOpen={setEditModalOpen} model={currentModel} />
    <WLBlockHeader text="Services & Fees" color={blockHeaderFill} short />
    <WLResponsiveSectionEditable
      headerBlack
      setLoaded={setInPersonLoaded}
      editable={userCanEditText} 
      firestoreId="in-person-sessions"
    />
    <div className="section-divider"/>
    <WLResponsiveSectionEditable
      sectionClasses="fade-to-pink"
      headerBlack
      textRight
      setLoaded={setVirtualLoaded}
      editable={userCanEditText} 
      firestoreId="virtual-sessions" 
    />
    <section className='d-flex flex-column align-items-center justify-content-center slideshow-background'>
      <AddModelButton userCanEdit={userCanEditTestimonials} model={TestimonialSlideshowPicture} setCurrentModel={setCurrentModel} setEditModalOpen={setEditModalOpen} />
      <div className="d-flex flex-column align-items-center justify-content-center px-xxl-5 px-xl-4 px-md-3 px-2" style={{width: "100%", overflow: "visible"}}>
        <WLAliceCarousel
          autoPlay={4000}
          pagination
          paginationTop
          breakpoints={createCarouselBreakpoints(1, 2, 2, 3, 4)}
          items={slideshowItems.map((s, i) => <SlideshowItemCard testimonialSlideshowPicture={s} key={i} />)}
        />
      </div>
    </section>
    </WLSpinnerPage>
  )
}