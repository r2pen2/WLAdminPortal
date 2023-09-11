import React from 'react'
import { CurrentSiteContext } from '../App';
import { FormResponse } from '../libraries/Web-Legos/api/admin.ts';
import { WLNavContent } from '../libraries/Web-Legos/components/Navigation';
import { VerticalDivider, WLSpinnerPage } from '../libraries/Web-Legos/components/Layout';
import {Text, Divider} from "@nextui-org/react"
import { DataGrid } from "@mui/x-data-grid"
import { getSlashDateString, getTimeOfDay } from '../libraries/Web-Legos/api/strings';

export default function SiteForms() {
  
  const {currentSite} = React.useContext(CurrentSiteContext);

  const [formResponsesFetched, setFormResponsesFetched] = React.useState(false);
  const [formResponses, setFormResponses] = React.useState([]);

  React.useEffect(() => {
    setFormResponses([FormResponse.examples.default, FormResponse.examples.alternate])
    //FormResponse.getAndSet(formResponses, setFormResponsesFetched)
  }, [])

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
      sortedResponses[responseBucket] = sortedResponses[responseBucket].sort((a, b) => a.createdAt - b.createdAt);
    }

    const minColumnWidth = 200;

    return Object.keys(sortedResponses).map((formId, i) => {
      
      function getRows() {
        let rows = [];
        for (const i in sortedResponses[formId]) {
          /** @type {Date}*/
          const createdAt = sortedResponses[formId][i].createdAt;
          const content = {id: i, date: `${getSlashDateString(createdAt)} ${getTimeOfDay(createdAt)}`, ...sortedResponses[formId][i].content};
          rows.push(content);
        }
        return rows;
      }

      
      function getCols() {
        let cols = [
          {
            field: "date",
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
      
      return (
        <div key={i} className="px-3 w-100 d-flex flex-column align-items-center justify-content-start">
          <div className="w-100 d-flex flex-row">
            <Text b align="left">
              {sortedResponses[formId][0].formTitle}
            </Text>
          </div>
          <Divider css={{marginBottom: "0.5rem"}}/>
          <DataGrid
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
    <WLSpinnerPage dependencies={[]}>
      {renderResponses()}
    </WLSpinnerPage>
  )
}
