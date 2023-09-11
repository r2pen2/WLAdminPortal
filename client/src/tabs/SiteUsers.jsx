import React from 'react'
import { CurrentSiteContext, CurrentUserContext } from '../App';
import { FormResponse } from '../libraries/Web-Legos/api/admin.ts';
import { WLNavContent } from '../libraries/Web-Legos/components/Navigation';
import { VerticalDivider, WLSpinnerPage } from '../libraries/Web-Legos/components/Layout';
import {Text, Divider, Modal, Button, Spinner, Loading } from "@nextui-org/react"
import { DataGrid } from "@mui/x-data-grid"
import { sortFieldsAlphabetically } from '../libraries/Web-Legos/api/sorting';
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function SiteUsers() {
  
  const {currentUser} = React.useContext(CurrentUserContext);
  const {currentSite} = React.useContext(CurrentSiteContext);

  const [usersFetched, setUsersFetched] = React.useState(false);
  const [users, setUsers] = React.useState(null);

  const minColumnWidth = 200;

function getUsers () {
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
}
  
  React.useEffect(() => {
    getUsers()
  }, [])

  if (!users) {
    return;
  }
  
  function PermissionCheckbox({perm, user}) {

    const [updating, setUpdating] = React.useState();

    function handleCellClick() {
      currentUser.getIdToken(true).then(idToken => {
        const postBody = {
          siteId: currentSite.siteKey,
          accessToken: idToken,
          email: user.email,
          field: perm,
          value: !user.permissions[perm],
        }
        setUpdating(true);
        fetch(`http://localhost:25565/external-users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postBody)
        }).then((response) => {
          if (response.status === 200) {
            setUsersFetched(false);
            getUsers();
          }
        });
      })
    }

    return updating ? <Loading size='sm' /> : <Checkbox checked={user.permissions[perm]} onClick={handleCellClick}/>
  }

  return (
    <WLSpinnerPage dependencies={[usersFetched]}>
      <div className="px-3 w-100 d-flex flex-column align-items-center justify-content-start">
        <TableContainer component={Paper}>
          <Table aria-label="users-table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>User Details</TableCell>
                <TableCell align="center" colSpan={Object.keys(users[0].permissions).length}>Permissions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Display Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>op</TableCell>
                {Object.keys(sortFieldsAlphabetically(users[0].permissions)).map((k,i) => (k !== "op" && <TableCell key={i}>{k}</TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>{user.displayName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><PermissionCheckbox perm="op" user={user} /></TableCell>
                    {Object.keys(sortFieldsAlphabetically(user.permissions)).map((permissionKey, pi) => (
                      (permissionKey !== "op") && <TableCell key={pi}><PermissionCheckbox perm={permissionKey} user={user} /></TableCell>
                    ))}
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </WLSpinnerPage>
  )
}