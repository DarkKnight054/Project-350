import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { mockTransactions } from '../../data/mockData';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../../theme';
import Court_Sidebar from '../global/Court_Sidebar';
import Passport_Sidebar from '../global/Passport_Sidebar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import CalendarViewMonthOutlinedIcon from '@mui/icons-material/CalendarViewMonthOutlined';
const Dashboard = ({ role }) => {
  const theme1 = useTheme();
  const colors = tokens(theme1.palette.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [count, setCount] = useState({
    court: '',
    jail: '',
    passport: '',
    police: '',
    criminal: '',
  });

  const [txnData, setTxnData] = useState([]);

  const location = useLocation();
  const { org } = location.state;
  console.log(`org value: ${org}`);

  useEffect(() => {
    axios
      .get('http://localhost:3001/count', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        console.log('court count :', response.data[0].Record.Court);
        setCount({
          court: response.data[0].Record.Court,
          jail: response.data[0].Record.Jail,
          passport: response.data[0].Record.Passport,
          police: response.data[0].Record.Police,
          criminal: response.data[0].Record.Criminal,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:3001/transaction', {
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
        Data.sort((a, b) => {
          if (a.Date > b.Date) return -1;
          if (a.Date < b.Date) return 1;
          if (a.Time > b.Time) return -1;
          if (a.Time < b.Time) return 1;
          return 0;
        });
        setTxnData(Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   txnData.sort((a, b) => {
  //     if (a.Date < b.Date) return -1;
  //     if (a.Date > b.Date) return 1;
  //     if (a.Time < b.Time) return -1;
  //     if (a.Time > b.Time) return 1;
  //     return 0;
  //   });
  // }, [txnData]);

  console.log('txn type: ', txnData);
  console.log('criminal data: ', count);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {org === 'court' ? (
            <Court_Sidebar isSidebar={isSidebar} />
          ) : (
            <Passport_Sidebar isSidebar={isSidebar} />
          )}
          <main className="content">
            <Box m="20px">
              {/* HEADER */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Header
                  title="DASHBOARD"
                  subtitle="Welcome to your dashboard"
                />

                <Box>
                  <Button
                    sx={{
                      backgroundColor: colors.blueAccent[700],
                      color: colors.grey[100],
                      fontSize: '14px',
                      fontWeight: 'bold',
                      padding: '10px 20px',
                    }}
                  >
                    <DownloadOutlinedIcon sx={{ mr: '10px' }} />
                    Download Reports
                  </Button>
                </Box>
              </Box>

              {/* GRID & CHARTS */}
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
              >
                {/* ROW 1 */}
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[600]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={count.court}
                    subtitle="Courts"
                    progress="0.75"
                    // increase="+14%"
                    icon={
                      <GavelOutlinedIcon
                        sx={{
                          color: colors.greenAccent[600],
                          fontSize: '26px',
                        }}
                      />
                    }
                  />
                </Box>
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[600]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={count.jail}
                    subtitle="Jails"
                    progress="0.50"
                    // increase="+21%"
                    icon={
                      <CalendarViewMonthOutlinedIcon
                        sx={{
                          color: colors.greenAccent[600],
                          fontSize: '26px',
                        }}
                      />
                    }
                  />
                </Box>
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[600]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={count.passport}
                    subtitle="Immigration offices"
                    progress="0.30"
                    // increase="+5%"
                    icon={
                      <PersonAddIcon
                        sx={{
                          color: colors.greenAccent[600],
                          fontSize: '26px',
                        }}
                      />
                    }
                  />
                </Box>
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[600]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={count.police}
                    subtitle="Police Stations"
                    progress="0.80"
                    // increase="+43%"
                    icon={
                      <TrafficIcon
                        sx={{
                          color: colors.greenAccent[600],
                          fontSize: '26px',
                        }}
                      />
                    }
                  />
                </Box>

                {/* ROW 2 */}
                <Box
                  gridColumn="span 4"
                  gridRow="span 2"
                  backgroundColor={colors.primary[600]}
                >
                  <Box
                    mt="25px"
                    p="0 30px"
                    display="flex "
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.grey[800]}
                      >
                        Total Criminals
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.greenAccent[500]}
                      >
                        {count.criminal}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton>
                        <DownloadOutlinedIcon
                          sx={{
                            fontSize: '26px',
                            color: colors.greenAccent[500],
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                <Box
                  gridColumn="span 8"
                  gridRow="span 2"
                  backgroundColor={colors.primary[600]}
                  overflow="auto"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    colors={colors.grey[800]}
                    p="15px"
                  >
                    <Typography
                      color={colors.blueAccent[600]}
                      variant="h5"
                      fontWeight="600"
                    >
                      Recent Activities
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p="15px"
                    borderBottom={`4px solid ${colors.primary[800]}`}
                  >
                    <Box>
                      <Typography
                        color={colors.greenAccent[500]}
                        variant="h5"
                        fontWeight="600"
                      >
                        Transaction Date
                      </Typography>
                      <Typography color={colors.grey[800]}>
                        Transaction Time
                      </Typography>
                    </Box>
                    <Box
                      color={colors.greenAccent[500]}
                      sx={{ textAlign: 'center' }}
                    >
                      Transaction ID
                    </Box>
                    <Box
                      color={colors.greenAccent[500]}
                      sx={{ textAlign: 'center' }}
                    >
                      Transaction Type
                    </Box>
                    <Box
                      color={colors.greenAccent[500]}
                      sx={{ textAlign: 'center' }}
                    >
                      {' '}
                      Transaction Name
                    </Box>
                  </Box>
                  {txnData.map((transaction, i) => (
                    <Box
                      key={`${transaction.txId}-${i}`}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom={`4px solid ${colors.primary[600]}`}
                      p="15px"
                    >
                      <Box>
                        <Typography
                          color={colors.greenAccent[500]}
                          variant="h5"
                          fontWeight="600"
                        >
                          {transaction.Date}
                        </Typography>
                        <Typography color={colors.grey[800]}>
                          {transaction.Time}
                        </Typography>
                      </Box>
                      <Box
                        color={colors.grey[800]}
                        sx={{ textAlign: 'center' }}
                      >
                        {transaction.TxId}
                      </Box>
                      <Box
                        color={colors.grey[800]}
                        sx={{ textAlign: 'center' }}
                      >
                        {transaction.Type}
                      </Box>
                      <Box
                        color={colors.grey[800]}
                        sx={{ textAlign: 'center' }}
                      >
                        {transaction.Name}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dashboard;
