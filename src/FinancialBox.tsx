import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { ReactNode } from "react";

const defaultStyles = {
  maxWidth: "1389px",
  maxHeight: "218px",
  border: "1px solid #94BBFF",
  borderRadius: "16px",
  paddingBlock: "16px",
  paddingInline: "32px",
};

const stackProps = {
  direction: "row",
  alignItems: "center",
  style: defaultStyles,
  justifyContent: "space-between",
} as const;

interface IFinancialContainerProps {
  children?: [JSX.Element, JSX.Element, JSX.Element];
}

const FinancialContainer = ({
  children = [<></>, <></>, <></>],
}: IFinancialContainerProps) => {
  return <Stack {...stackProps}>{children}</Stack>;
};

const financeBoxStyles = {
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  gap: "16px",
  minWidth: "232px",
  minHeight: "186px",
  maxWidth: "232px",
  maxHeight: "186px",
  borderRadius: "16px",
  overflow:'hidden'
};

const bgColors = {
  blue: "#ecf3ff",
  red: "#faa19b",
} as const;

interface IFinanceBoxProps {
  headerText?: string;
  content?: string;
  footerText?: string;
  backgroundColor?: "blue" | "red";
  children: ReactNode;
}

const headerStyles = {
  fontFamily: "'Poppins'",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "160%",
  letterSpacing: "0.4px",
  color: "#2B64CB",
  flex: "none",
  order: 0,
  flexGrow: 0
}

const headerProps = {
  sx: headerStyles 
}

const getChildren = (c:ReactNode) => {
  if(typeof c === 'string' || typeof c === 'number')return <Typography {...headerProps}>{c}</Typography>
  return c;
}

FinancialContainer.FinanceBox = ({
  backgroundColor = "blue",
  children,
}: IFinanceBoxProps) => {
  const newChildren = getChildren(children);
  return (
    <Box sx={{ ...financeBoxStyles, background: bgColors[backgroundColor] }}>
      {newChildren}
    </Box>
  );
};

const FinanceContainer = React.memo(FinancialContainer);
FinanceContainer.displayName = "FinanceBox";
export default FinanceContainer;
export const FinanceBox = FinancialContainer.FinanceBox;
