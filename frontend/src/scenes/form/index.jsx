import React from 'react';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../../theme';
import Sidebar from '../global/Court_Sidebar';
import axios from '../../config/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values);
    console.log(values.date);
    const success = () => toast('Successfully updated a new criminal!');
    const denied = () => toast('Please provide valid information!');
    axios
      .post('court/criminalentry', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        success();
      })
      .catch((error) => {
        console.log(error);
        denied();
      });
  };
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Box m="20px">
              <Header
                title="CREATE Criminal"
                subtitle="Create a New Criminal Profile"
              />

              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
              >
                {({ values, handleBlur, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        '& > div': {
                          gridColumn: isNonMobile ? undefined : 'span 4',
                        },
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Date Of Birth"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.date}
                        name="date"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Jail Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.jailName}
                        name="jailName"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Jail ID"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.jailID}
                        name="jailID"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Punishment Start Date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.punishmentStartDate}
                        name="punishmentStartDate"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Punishment End Date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.punishmentEndDate}
                        name="punishmentEndDate"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="National ID"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.nid}
                        name="nid"
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Court ID"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.courtID}
                        name="courtID"
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Gender"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.gender}
                        name="gender"
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Crime Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.crime}
                        name="crime"
                        sx={{ gridColumn: 'span 4' }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Create Criminal
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  nid: yup
    .string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  jailName: yup.string().required('required'),
  jailID: yup.string().required('required'),
  punishmentStartDate: yup.string().required('required'),
  punishmentEndDate: yup.string().required('required'),
  courtID: yup.string().required('required'),
  gender: yup.string().required('required'),
  crime: yup.string().required('required'),
});
const initialValues = {
  name: '',
  date: '02/23/2024',
  email: '',
  nid: '',
  jailName: '',
  jailID: '',
  punishmentStartDate: '02/23/2024',
  punishmentEndDate: '02/23/2024',
  courtID: '',
  gender: '',
  crime: '',
};

export default CreateForm;
