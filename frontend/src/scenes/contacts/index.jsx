import React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataContacts } from '../../data/mockData';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../../theme';
import Court_Sidebar from '../global/Court_Sidebar';
import Passport_Sidebar from '../global/Passport_Sidebar';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Contacts = () => {
  const theme1 = useTheme();
  const colors = tokens(theme1.palette.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [criminalData, setcriminalData] = useState([]);

  const location = useLocation();
  const { org } = location.state;

  useEffect(() => {
    console.log('org name: ', org);
    const cookieValue = Cookies.get('email');
    console.log('cookie value ', cookieValue);
    console.log('======= inside the useeffect ========');
    if (org === 'court') {
      axios
        .get('http://localhost:3001/criminal/list', {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((response) => {
          let Data = [];
          let counter = 1;
          response.data.map((criminal) => {
            criminal.Record['id'] = counter++;
            Data.push(criminal.Record);
          });
          setcriminalData(Data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (org === 'jail' || org === 'passport' || org === 'police') {
      axios
        .get('http://localhost:3001/criminal/list', {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((response) => {
          let Data = [];
          let counter = 1;
          response.data.map((criminal) => {
            criminal.Record['id'] = counter++;
            Data.push(criminal.Record);
          });
          setcriminalData(Data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  if (criminalData !== undefined) {
    criminalData.map((data) => {
      for (let elm in data) {
        console.log('element of each data: ', elm, data[elm]);
      }
    });
  }
  let count = 1;
  const generateRowId = (rows) => {
    return count++;
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'TxnId',
      headerName: 'Txn Id',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'Name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'Crime',
      headerName: 'Crime',
      headerAlign: 'left',
      align: 'left',
    },
    { field: 'Nid', headerName: 'NID' },
    {
      field: 'Psd',
      headerName: 'Punishment Start Date',
      flex: 1,
    },
    {
      field: 'Ped',
      headerName: 'Punishment End Date',
      flex: 1,
    },
    {
      field: 'CourtId',
      headerName: 'Court Id',
      flex: 1,
    },
    {
      field: 'JailName',
      headerName: 'Jail Name',
      flex: 1,
    },
    {
      field: 'Gender',
      headerName: 'Gender',
      flex: 1,
    },
    {
      field: 'Dob',
      headerName: 'Date of Birth',
      flex: 1,
    },
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {org === 'passport' || org === 'jail' || org === 'police' ? (
            <Passport_Sidebar isSidebar={isSidebar} />
          ) : (
            <Court_Sidebar isSidebar={isSidebar} />
          )}
          <main className="content">
            <Box m="20px">
              <Header title="CONTACTS" subtitle="List of Criminals" />
              <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                  '& .MuiDataGrid-root': {
                    border: 'none',
                  },
                  '& .MuiDataGrid-cell': {
                    borderBottom: 'none',
                  },
                  '& .name-column--cell': {
                    color: colors.greenAccent[500],
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: colors.blueAccent[300],
                    borderBottom: 'none',
                  },
                  '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: colors.primary[600],
                  },
                  '& .MuiDataGrid-footerContainer': {
                    borderTop: 'none',
                    backgroundColor: colors.blueAccent[300],
                  },
                  '& .MuiCheckbox-root': {
                    color: `${colors.greenAccent[600]} !important`,
                  },
                  '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                    color: `${colors.grey[900]} !important`,
                  },
                }}
              >
                <DataGrid
                  rows={criminalData}
                  getRowId={generateRowId}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                />
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Contacts;
