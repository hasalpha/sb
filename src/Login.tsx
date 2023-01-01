import React from "react";
import { SocialSignInStartButtons } from "./auth/socialSignIn/SocialSignInStartButtons";
import {
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import authApiClient from "./Api";
import Success from "./Success";
import { ReactComponent as Person } from "./svg/person.svg";
import { ReactComponent as Key } from "./svg/key.svg";
import { ReactComponent as Or } from "./svg/or.svg";
import { Box } from "@mui/material";
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPassword(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    if (email && password) {
      setError("");
      setLoading(true);
      const res = await authApiClient.login(email, password);
      setLoading(false);
      if(res?.user){
        localStorage.setItem('state',JSON.stringify(res.user))
        localStorage.setItem("token", res.user.token);
        setSuccess(true);
      }
      if (!res.ok) {
        return setError(
          "The email or password you entered is incorrect. Please review and try again"
        );
      }
      // return onSubmitSuccess(res.user);
    }
  };

  async function handleSignInWithUphabit(){
    setLoading(true);
    const newUrl = 'https://web.development.uphabit.io/auth/login';
    if(chrome && chrome.tabs && chrome.tabs.query){
      const tabs:any = await chrome.tabs.query({ active: true, currentWindow: true })
      if(tabs[0]?.url.includes('web.development.uphabit.io')){
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id, allFrames: true},
          func: ()=>{
            const get = localStorage.getItem('state')
            return get;
          }
      },(e:any)=>{
        if(e[0]?.result){
          const result = JSON.parse(e[0].result);
          localStorage.setItem('state',e[0].result)
          localStorage.setItem("token", result.token);
          setSuccess(true)
          setLoading(false);
        }
      });
      } else {
        chrome.tabs.create({ url: newUrl });
        setLoading(false);
      }
    }
  }

  // const onSubmitSuccess = (res: any) => {
  //   const { user, token } = res;
  //   // console.log("user: ", user);
  //   // console.log("token: ", token);
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("firstName", user.first_name);
  //   setSuccess(true);
  // };

  if (success) {
    return <Success justLoggedIn />;
  }

  if (localStorage.getItem("token")) {
    return <Success />;
  }

  return (
    <Box paddingX={1} height="100%">
      <Typography variant="body1">Signin to your UpHabit account</Typography>
      <FormControl variant="standard" fullWidth className="loginForm">
        <TextField
          required
          fullWidth
          className="textFields"
          size="small"
          variant="filled"
          id="email"
          placeholder="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          type="email"
          value={email}
          onChange={handleEmailChange}
          hiddenLabel
        />
        <TextField
          required
          fullWidth
          size="small"
          variant="filled"
          id="password"
          placeholder="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          hiddenLabel
        />
        <LoadingButton
          className="button"
          variant="contained"
          loadingPosition="start"
          loading={loading}
          disabled={loading}
          onClick={handleSubmit}
          sx={{ mt: 1, textTransform: "capitalize" }}
        >
          Sign In
        </LoadingButton>
        <Typography color="error">{error}</Typography>
        <Or />
        {/* <LoadingButton
          className="button"
          variant="contained"
          loadingPosition="start"
          loading={loading}
          disabled={loading}
          onClick={handleSignInWithUphabit}
          sx={{ mt: 1, textTransform: "capitalize" }}
        >
          Sign In with uphabit
        </LoadingButton> */}
        <SocialSignInStartButtons handleSubmit={handleSignInWithUphabit}/>
      </FormControl>
    </Box>
  );
}

export default Login;
