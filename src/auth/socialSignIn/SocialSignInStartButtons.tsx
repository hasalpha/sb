import Button from "@mui/material/Button";
import React from "react";

import { ReactComponent as AppleIcon } from "./apple.svg";
import { ReactComponent as GoogleIcon } from "./google.svg";
import { ReactComponent as MicrosoftIcon } from "./microsoft.svg";
import styles from "../socialSignIn/startButtons.module.scss";
import { Stack } from "@mui/material";

type SocialButtonProps = {
  handleSubmit:()=>Promise<void>;
  icon?: React.ReactNode;
  buttonStyles?: React.CSSProperties;
};

export const SocialButton: React.FC<SocialButtonProps> = (props) => {
  const { children, handleSubmit, icon, buttonStyles } = props;

  return (
    <Button
      onClick={()=>handleSubmit()}
      component="a"
      variant="outlined"
      startIcon={icon}
      disableElevation
      className={styles.button}
      style={buttonStyles}
    >
      <span className={styles.buttonContent}>{children}</span>
    </Button>
  );
};

export const SocialSignInStartButtons: React.FC<{ className?: string,handleSubmit:()=>Promise<void> }> = ({
  className,
  handleSubmit
}) => {
  // if (!config.showSsoButtons) {
  //   console.log("HIT");
  //   return null;
  // }

  return (
    <Stack direction={"row"} justifyContent='space-between'>
      <SocialButton
        icon={
          <GoogleIcon
            style={{
              backgroundColor: "white",
              padding: "2px",
            }}
          />
        }
        buttonStyles={{
          // backgroundColor: '#2096F3',
          borderColor: "transparent",
          // color: 'white'
        }}
        handleSubmit={handleSubmit}
      ></SocialButton>
      <SocialButton
        icon={<MicrosoftIcon />}
        buttonStyles={{
          borderColor: "transparent",
        }}
        handleSubmit={handleSubmit}
      ></SocialButton>
      <SocialButton
        icon={<AppleIcon />}
        handleSubmit={handleSubmit}
        buttonStyles={{
          backgroundColor: "#000",
          // color: "#fff",
        }}
      ></SocialButton>
    </Stack>
  );
};
