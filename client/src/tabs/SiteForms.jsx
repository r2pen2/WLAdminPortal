import React from 'react'
import { CurrentSiteContext, CurrentUserContext } from '../App';
import { FormResponse } from '../libraries/Web-Legos/api/admin.ts';
import { WLNavContent } from '../libraries/Web-Legos/components/Navigation';
import { VerticalDivider, WLSpinnerPage } from '../libraries/Web-Legos/components/Layout';
import {Text, Divider, Modal, Button } from "@nextui-org/react"
import { DataGrid } from "@mui/x-data-grid"
import { getTimeOfDay } from '../libraries/Web-Legos/api/strings';

export default function SiteForms() {
  
  const {currentUser} = React.useContext(CurrentUserContext);
  const {currentSite} = React.useContext(CurrentSiteContext);

  const [formResponsesFetched, setFormResponsesFetched] = React.useState(false);
  const [formResponses, setFormResponses] = React.useState([]);

  React.useEffect(() => {
    currentUser.getIdToken(true).then(idToken => {
      fetch(`http://localhost:25565/external-forms?siteId=${currentSite.siteKey}&accessToken=${idToken}`).then((response) => {
        response.json().then(json => {
          let newResponses = [];
          for (const key of Object.keys(json)) {
            const res = json[key];
            res.id = key;
            newResponses.push(res);
          }
          setFormResponses(newResponses);
          setFormResponsesFetched(true);
        })
      })
    })
  }, [])

  const [focusedRow, setFocusedRow] = React.useState(null);

  function renderResponses() {
    // Sort responses into buckets by their formId
    const sortedResponses = {};
    const alphabeticalResponses = formResponses.sort((a, b) => a.formId - b.formId)
    for (const r of alphabeticalResponses) {
      if (!sortedResponses[r.formId]) {
        sortedResponses[r.formId] = [];
      }
      sortedResponses[r.formId].push(r);
    }
    for (const responseBucket of Object.keys(sortedResponses)) {
      sortedResponses[responseBucket] = sortedResponses[responseBucket].sort((a, b) => b.createdAtSeconds - a.createdAtSeconds);
    }

    const minColumnWidth = 200;

    return Object.keys(sortedResponses).map((formId, i) => {
      
      function getRows() {

        let rows = [];
        for (const i in sortedResponses[formId]) {
          const content = {id: i, Timestamp: sortedResponses[formId][i].createdAt, ...sortedResponses[formId][i].content};
          rows.push(content);
        }
        return rows;
      }

      
      function getCols() {
        let cols = [
          {
            field: "Timestamp",
            headerName: "Timestamp",
            width: FormResponse.getFieldWidth("Timestamp") ? FormResponse.getFieldWidth("Timestamp") : minColumnWidth
          }
        ];
        for (const k of Object.keys(sortedResponses[formId][0].content)) {
          const fieldWidth = FormResponse.getFieldWidth(k);
          const col = {};
          col.field = k;
          col.headerName = k;
          col.width = fieldWidth ? fieldWidth : minColumnWidth;
          cols.push(col);
        }
        return cols;
      }
      
      function handleCellClick(e) {
        setFocusedRow(e.row)
      }

      function renderFocusedRow() {
        if (!focusedRow) {return;}
        const sortedKeys = Object.keys(focusedRow).sort()
        return sortedKeys.map((k, i) => {
          return (k !== "id") && <div key={i} className='w-100 py-2 flex-column align-items-start justify-content-start'>
            <Text b>
              {k}
            </Text>
            <Text>
              {focusedRow[k]}
            </Text>
          </div>
        })
      }


      return (
        <div key={i} className="px-3 w-100 d-flex flex-column align-items-center justify-content-start">
          <Modal
            open={focusedRow}
            onClose={() => setFocusedRow(null)}
            className="p-3 d-flex flex-column align-items-center justify-content-center"
          >
            {renderFocusedRow()}
            <Button flat color="error" onClick={() => setFocusedRow(null)}>
              Close
            </Button>
          </Modal>
          <div className="w-100 d-flex flex-row">
            <Text b align="left">
              {sortedResponses[formId][0].formTitle}
            </Text>
          </div>
          <Divider css={{marginBottom: "0.5rem"}}/>
          <DataGrid
            onRowClick={handleCellClick}
            sx={{width: "100%"}}
            rows={getRows()}
            columns={getCols()}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5]}
          />
        </div>
      )
    })
  }

  return (
    <WLSpinnerPage dependencies={[formResponsesFetched]}>
      {renderResponses()}
    </WLSpinnerPage>
  )
}
