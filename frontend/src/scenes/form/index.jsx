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
const Form = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values);
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
                title="CREATE/DELETE Criminal"
                subtitle="Create/Delete a New Criminal Profile"
              />

              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
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
                        value={values.firstName}
                        name="name"
                        error={!!touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Date of birth"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="dob"
                        error={!!touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                        sx={{ gridColumn: 'span 2' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Gender"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="gender"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Nationality"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.contact}
                        name="nationality"
                        error={!!touched.contact && !!errors.contact}
                        helperText={touched.contact && errors.contact}
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Crime"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address1}
                        name="crime"
                        error={!!touched.address1 && !!errors.address1}
                        helperText={touched.address1 && errors.address1}
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="NID"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address2}
                        name="nid"
                        error={!!touched.address2 && !!errors.address2}
                        helperText={touched.address2 && errors.address2}
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Punishment start date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address2}
                        name="psd"
                        error={!!touched.address2 && !!errors.address2}
                        helperText={touched.address2 && errors.address2}
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Punishment end date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address2}
                        name="ped"
                        error={!!touched.address2 && !!errors.address2}
                        helperText={touched.address2 && errors.address2}
                        sx={{ gridColumn: 'span 4' }}
                      />
                    </Box>

                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Create/Delete New Criminal
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

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup
    .string()
    .email('invalid email')
    .required('required'),
  contact: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  address1: yup.string().required('required'),
  address2: yup.string().required('required'),
});
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  address1: '',
  address2: '',
};

export default Form;
