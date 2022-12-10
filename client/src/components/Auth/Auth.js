import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { useState } from "react";
import { paper, avatar, submit, googlelogin } from "./styles";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { auth } from "../../store/slice/authSlice";
import { signUpAction, signInAction } from "../../store/slice/authActions";
const initState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(initState);
  const userData = {};
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (isSignUp) dispatch(signUpAction(formData));
    else dispatch(signInAction(formData));
  };
  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((currState) => {
      return { ...currState, [inputName]: inputValue };
    });
  };
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const googleSuccess = (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch(auth({ result, token }));
  };
  const googleError = () => {
    alert("Google Sign In Failed. Please try again later.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={paper}>
        <Avatar sx={avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "SignUp" : "SignIn"}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  handleChange={handleChange}
                  label="First Name"
                  half
                  autofocus
                />
                <Input
                  name="lastName"
                  handleChange={handleChange}
                  label="Last Name"
                  half
                  autofocus
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="912920720719-8mfma56skig97nacsu6aal07luf9kt6e.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                sx={googlelogin}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
