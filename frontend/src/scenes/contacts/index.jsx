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
  const [data, setData] = useState([]);

  const location = useLocation();
  const { org } = location.state;
  console.log(`org is : ${org}`);

  useEffect(() => {
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
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (org === 'jail') {
      axios
        .get('http://localhost:3001/criminal/list', {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'registrarId', headerName: 'Registrar ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1,
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      flex: 1,
    },
  ];
  // console.log('org value', org);
  // console.log('check', org === 'passport');
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {org === 'passport' ? (
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
                  rows={mockDataContacts}
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
