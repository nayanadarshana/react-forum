import React from "react";
import {
  Container,
  Card,
  styled,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { mainUserIsRegisteringSelector } from "../../main/store/MainSelector";
import { registerUser } from "../../main/store/MainSlice";

const StyledContainer = styled(Container)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoginCard = styled(Card)`
  width: 400px;
  max-width: 100%;
`;

const FieldContainer = styled(Container)`
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 10px;
`;

const StyledInput = styled(TextField)`
  margin-bottom: 10px;
  width: 100%;
`;

const RegisterSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(mainUserIsRegisteringSelector);

  function handleFormSubmit({ email, password, name }) {
    dispatch(registerUser({ email, password, name }));
  }

  return (
    <StyledContainer maxWidth="lg">
      <StyledLoginCard variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Register
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            Please enter your account information to sign up
          </Typography>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={handleFormSubmit}
            validationSchema={RegisterSchema}
          >
            {({ handleSubmit, values, handleChange, errors }) => (
              <>
                <FieldContainer>
                  <StyledInput
                    label="Full name"
                    type="text"
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                    error={errors.name}
                  />
                  <StyledInput
                    label="Email address"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    error={errors.email}
                  />
                  <StyledInput
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password}
                  />
                </FieldContainer>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Sign up
                </Button>
              </>
            )}
          </Formik>
        </CardContent>
      </StyledLoginCard>
    </StyledContainer>
  );
}
