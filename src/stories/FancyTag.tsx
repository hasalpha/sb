import { Box, Typography } from "@mui/material";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { memo } from "react";
import "@fontsource/oxanium";

const defaultStyles = {
  position: "relative",
  display: "inline-block",
  marginInline: "1rem",
  marginBlock: "0.5rem",
  marginTop: "1rem",
  boxShadow:
    "0px 4px 5px -2px rgba(153, 153, 153, 0.2), 0px 7px 10px 1px rgba(99, 99, 99, 0.14), 0px 2px 16px 1px rgba(107, 107, 107, 0.12)",
  borderRadius: "8px",
  padding: "1rem",
  minWidth: "180px",
  minHeight: "90px",
  textAlign: "center",
};

const headingStyles = {
  display: "inline-block",
  fontFamily: "'Oxanium'",
  fontWeight: 500,
  fontSize: "48px",
  lineHeight: "80%",
};

const subHeadingStyles = {
  fontFamily: "'Poppins'",
  fontWeight: 700,
  color: "#757575",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: "17px",
  marginInline: "auto",
  width: "150px",
  textAlign: "center",
};

const badgeStyles = {
  position: "absolute",
  width: "44px",
  height: "39px",
  top: "-12px",
  left: "9px",
};

const iconStyles = {
  position: "absolute",
  width: "24px",
  height: "24px",
  left: "10px",
  top: "8px",
  color: "#FFFFFF",
};

const acceptedColors = {
  blue: "#2352A6",
  green: "#008280",
  red: "#c8372c",
};

interface INotifyTag {
  heading?: string | number;
  subHeading?: string | number;
  badgeColor?: keyof typeof acceptedColors;
}

const isValidNumber = (s: string | number): s is number => {
  return !isNaN(parseInt("" + s));
};

const compactor = (heading: Exclude<INotifyTag["heading"], undefined>) => {
  if (isValidNumber(heading))
    return Intl.NumberFormat("en", { notation: "compact" }).format(+heading);
  return heading;
};

const NotifyTag = ({
  heading = "",
  subHeading = "",
  badgeColor = "blue",
}: INotifyTag) => {
  const compactHeading = compactor(heading!);
  return (
    <Box sx={defaultStyles}>
      <Box sx={{ ...badgeStyles, background: acceptedColors[badgeColor] }}>
        <BusinessCenterOutlinedIcon sx={iconStyles} />
      </Box>
      <Typography sx={headingStyles}>{compactHeading}</Typography>
      <Typography sx={subHeadingStyles}>{subHeading}</Typography>
    </Box>
  );
};

const FancyTag = memo(NotifyTag);

export default FancyTag;
