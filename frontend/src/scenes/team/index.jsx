import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../../theme';
import Sidebar from '../global/Court_Sidebar';
import axios from '../../config/axiosConfig';
import { useLocation } from 'react-router-dom';
import Court_Sidebar from '../global/Court_Sidebar';
import Passport_Sidebar from '../global/Passport_Sidebar';

const Team = () => {
  const theme1 = useTheme();
  const colors = tokens(theme1.palette.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [orgData, setOrgData] = useState([]);

  const location = useLocation();
  const { org } = location.state;

  useEffect(() => {
    axios
      .get('organizations', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        let Data = [];
        let counter = 1;
        console.log('txn data: ', response.data);
        response.data.map((txn) => {
          txn.Record['id'] = counter++;
          Data.push(txn.Record);
        });
        setOrgData(Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log('manage team: ', orgData);

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'Id',
      headerName: 'Email',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    // {
    //   field: 'Type',
    //   headerName: 'Type of org',
    //   headerAlign: 'left',
    //   align: 'left',
    // },
    {
      field: 'Name',
      headerName: 'Author',
      flex: 1,
    },
    {
      field: 'TxnId',
      headerName: 'Txn Id',
      flex: 1,
    },
    {
      field: 'Type',
      headerName: 'Access Level',
      flex: 1,
      headerAlign: 'center',
      renderCell: ({ row: { Type } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              Type === 'court'
                ? colors.greenAccent[600]
                : Type === 'jail'
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {Type === 'court' && <AdminPanelSettingsOutlinedIcon />}
            {Type === 'jail' && <SecurityOutlinedIcon />}
            {Type === 'police' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[200]} sx={{ ml: '5px' }}>
              {Type}
            </Typography>
          </Box>
        );
      },
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
              <Header
                title="Organization's peers"
                subtitle="Listing the peers of organizations "
              />
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
                  rows={orgData}
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

export default Team;
