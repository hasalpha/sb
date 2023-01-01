import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/poppins";
import "@fontsource/oxanium";
import FinanceContainer, { FinanceBox } from "./FinancialBox";
import { Typography } from "@mui/material";

function App() {
  return (
    <FinanceContainer>
      <FinanceBox backgroundColor="blue">
        <Typography variant="h2">Total Revenue</Typography>
      </FinanceBox>
      <FinanceBox backgroundColor="red">Total Cost</FinanceBox>
      <FinanceBox backgroundColor="red" children="Total Profit" />
    </FinanceContainer>
  );
}

export default App;
