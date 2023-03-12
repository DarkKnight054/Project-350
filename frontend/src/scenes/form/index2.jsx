import React, { useEffect } from 'react';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik, setIn } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../../theme';
import Sidebar from '../global/Court_Sidebar';
import axios from '../../config/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    date: '02/23/24',
    email: '',
    nid: '',
    jailName: '',
    jailID: '',
    punishmentStartDate: '02/23/24',
    punishmentEndDate: '02/23/24',
    courtID: '',
    gender: '',
    crime: '',
  });
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const fetchData = () => {
    console.log('nid:', initialValues.nid);
    axios
      .get(`criminal/${initialValues.nid}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('responsed criminal data', response.data);
        setInitialValues({
          name: response.data.Name,
          date: response.data.Dob,
          email: response.data.CourtMail,
          nid: response.data.Nid,
          jailName: response.data.JailName,
          jailID: response.data.JailId,
          punishmentStartDate: response.data.Psd,
          punishmentEndDate: response.data.Ped,
          courtID: response.data.CourtId,
          gender: response.data.Gender,
          crime: response.data.Crime,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFormSubmit = () => {
    console.log('handleFromSubmit clicked', initialValues);
    axios
      .post('court/updatecriminal', initialValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log('inside useeffect: ', initialValues);
  }, [initialValues]);
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
                title="Update Criminal"
                subtitle="Update a Criminal's Information"
              />

              <Formik
                // onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
              >
                {({ values, handleBlur, handleChange, handleSubmit }) => (
                  <form>
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
                        label="National ID"
                        onBlur={handleBlur}
                        onChange={(event) => {
                          setInitialValues({
                            ...initialValues,
                            nid: event.target.value,
                          });
                        }}
                        value={initialValues.nid}
                        name="nid"
                        sx={{ gridColumn: 'span 3' }}
                      />

                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={fetchData}
                        sx={{ gridColumn: 'span 1' }}
                      >
                        Validate NID
                      </Button>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.name}
                        name="name"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Date Of Birth"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.date}
                        name="date"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Jail Name"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.jailName}
                        name="jailName"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Jail ID"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.jailID}
                        name="jailID"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Punishment Start Date"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.punishmentStartDate}
                        name="punishmentStartDate"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Punishment End Date"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.punishmentEndDate}
                        name="punishmentEndDate"
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.email}
                        name="email"
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Court ID"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.courtID}
                        name="courtID"
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Gender"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.gender}
                        name="gender"
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Crime Description"
                        onBlur={handleBlur}
                        onChange={handleFieldChange}
                        value={initialValues.crime}
                        name="crime"
                        sx={{ gridColumn: 'span 4' }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button
                        type="button"
                        onClick={handleFormSubmit}
                        color="secondary"
                        variant="contained"
                      >
                        Update Criminal
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
// let initialValues = {
//   name: '',
//   date: '',
//   email: '',
//   nid: '',
//   jailName: '',
//   jailID: '',
//   punishmentStartDate: '',
//   punishmentEndDate: '',
//   courtID: '',
//   gender: '',
//   crime: '',
// };

export default UpdateForm;
