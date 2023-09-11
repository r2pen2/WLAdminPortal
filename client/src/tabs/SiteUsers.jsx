import React from 'react'
import { CurrentSiteContext, CurrentUserContext } from '../App';
import { FormResponse } from '../libraries/Web-Legos/api/admin.ts';
import { WLNavContent } from '../libraries/Web-Legos/components/Navigation';
import { VerticalDivider, WLSpinnerPage } from '../libraries/Web-Legos/components/Layout';
import {Text, Divider, Modal, Button } from "@nextui-org/react"
import { DataGrid } from "@mui/x-data-grid"
import { getTimeOfDay } from '../libraries/Web-Legos/api/strings';

export default function SiteUsers() {
  
  const {currentUser} = React.useContext(CurrentUserContext);
  const {currentSite} = React.useContext(CurrentSiteContext);

  const [usersFetched, setUsersFetched] = React.useState(false);
  const [users, setUsers] = React.useState(null);

  const minColumnWidth = 200;

  React.useEffect(() => {
    currentUser.getIdToken(true).then(idToken => {
      fetch(`http://localhost:25565/external-users?siteId=${currentSite.siteKey}&accessToken=${idToken}`).then((response) => {
        response.json().then(json => {
          let newUsers = [];
          for (const key of Object.keys(json)) {
            const res = json[key];
            res.id = key;
            newUsers.push(res);
          }
          setUsers(newUsers.sort((a, b) => a.displayName - b.displayName));
        })
      })
    })
  }, [])

      function getRows() {

        let rows = [];
        for (const i in users) {
          const content = {id: i, "Display Name": users[i].displayName, "Email": users[i].email, ...users[i].permissions};
          rows.push(content);
        }
        return rows;
      }

      
      function getCols() {
        let cols = [
          {
            field: "Display Name",
            headerName: "Display Name",
            width: minColumnWidth
          },
          {
            field: "Email",
            headerName: "Email",
            width: minColumnWidth
          },
        ];
        for (const k of Object.keys(users[0].permissions)) {
          const col = {};
          col.field = k;
          col.headerName = k;
          col.width = minColumnWidth;
          cols.push(col);
        }
        return cols;
      }

  return (
    <WLSpinnerPage dependencies={[usersFetched]}>
      <div className="px-3 w-100 d-flex flex-column align-items-center justify-content-start">
        {users && 
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
        }
      </div>
    </WLSpinnerPage>
  )
}
