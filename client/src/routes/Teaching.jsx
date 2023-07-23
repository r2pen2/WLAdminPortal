import React, { useEffect, useState } from 'react'

import "../assets/style/teaching.css"
import { WLBlockHeader, WLHeader, WLText } from '../libraries/Web-Legos/components/Text';

import { blockHeaderFill } from "../assets/style/colors";
import { WLResponsiveSectionEditable, WLSpinnerPage } from '../libraries/Web-Legos/components/Layout';
import { WLImage } from '../libraries/Web-Legos/components/Images';

import { TeachingItem } from "../api/siteModels.ts";
import { SiteModel } from '../libraries/Web-Legos/api/models.ts';

import { AddModelButton, ModelEditButton, ModelEditModal } from "../libraries/Web-Legos/components/Modals"
import { Card, Divider, Text } from '@nextui-org/react';

const userCanEditText = true;

export default function Teaching() {

  const [teachingItems, setTeachingItems] = useState([]);

  useEffect(() => {
    TeachingItem.getAndSet(setTeachingItems);
  }, []);

  const [currentModel, setCurrentModel] = useState(new SiteModel());
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [teachingHookLoaded, setTeachingHookLoaded] = useState(false);
  const [teachingDescriptionLoaded, setTeachingDescriptionLoaded] = useState(false);

  function renderTeachingItems() {
    return teachingItems.map((ti, i) => <TeachingItemCard teachingItem={ti} key={i} />);
  }

  function TeachingItemCard({teachingItem}) {
    return (
      <div className="d-flex w-100 my-2 align-items-center justify-content-center">
        <Card className="p-2" isHoverable variant="bordered" style={{maxWidth: 640}}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex flex-column">
              <Text b>{teachingItem.title}</Text>
              <Divider style={{width: "100%"}} />
            </div>
            <Text style={{maxWidth: 600}}>{teachingItem.description}</Text>
          </div>
          <div className="d-flex flex-column justify-content-center d-lg-none">          
            <ModelEditButton userCanEdit={userCanEditText} data={teachingItem} model={TeachingItem} setCurrentModel={setCurrentModel} setEditModalOpen={setEditModalOpen} />
          </div>
        </Card>
        <div className="d-none d-lg-flex" style={{marginLeft: "2rem"}}>
          <ModelEditButton userCanEdit={userCanEditText} data={teachingItem} model={TeachingItem} setCurrentModel={setCurrentModel} setEditModalOpen={setEditModalOpen} />
        </div>
      </div>
    )
  }

  return (
  <WLSpinnerPage dependencies={[teachingHookLoaded, teachingDescriptionLoaded]} containerClasses="page-background">
    <ModelEditModal open={editModalOpen} setOpen={setEditModalOpen} model={currentModel} />
    <WLBlockHeader text="Teaching & Speaking" color={blockHeaderFill} short />
    <section className="d-flex flex-column align-items-center justify-content-center py-2 py-lg-5">
      <WLHeader firestoreId="teaching-hook-header" editable={userCanEditText}></WLHeader>
      <div style={{maxWidth: 1400}}>
        <WLText firestoreId="teaching-hook" editable={userCanEditText}></WLText>
      </div>
    </section>
    <section className="container-fluid d-flex flex-column align-items-center jusytify-content-start">
      <div className="row w-100">
        <div className="col-xxl-4 py-xl-4 py-3 col-xl-0 d-flex flex-column align-items-center justify-content-center">
          <WLImage 
            editable={userCanEditText} 
            firestoreId="teaching-description" 
            shadow 
            imgCss={{
              height: "100%", 
              maxHeight: 600
            }}
          />
        </div>
        <div className="col-xxl-8 py-xl-4 py-3 col-xl-12 d-flex flex-column align-items-center justify-content-center">
            <WLHeader firestoreId="teaching-description-header" setLoaded={setTeachingDescriptionLoaded} />
            <div className="d-flex flex-column w-100 align-items-center justify-content-start">
              { renderTeachingItems() }
              <AddModelButton userCanEdit={userCanEditText} model={TeachingItem} setCurrentModel={setCurrentModel} setEditModalOpen={setEditModalOpen} />
            </div>
        </div>
      </div>
    </section>
    </WLSpinnerPage>
  )
}