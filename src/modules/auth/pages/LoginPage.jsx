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
import { authenticateUser } from "../../main/store/MainSlice";
import { mainUserIsAuthenticatingSelector } from "../../main/store/MainSelector";

const PageContainer = styled(Container)`
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

const LoginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(mainUserIsAuthenticatingSelector);

  function handleFormSubmit({ email, password }) {
    dispatch(authenticateUser({ email, password }));
  }

  return (
    <PageContainer>
      <StyledLoginCard variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Login
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            Please enter your credentials to login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleFormSubmit}
            validationSchema={LoginSchema}
          >
            {({ handleSubmit, values, handleChange, errors }) => (
              <>
                <FieldContainer>
                  <StyledInput
                    label="Email address"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    error={errors.email}
                  />
                  <StyledInput
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                </FieldContainer>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
              </>
            )}
          </Formik>
        </CardContent>
      </StyledLoginCard>
    </PageContainer>
  );
}
