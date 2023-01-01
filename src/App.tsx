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
      <FinanceBox backgroundColor="blue" headerText="Total Revenue" content="20000" />
      <FinanceBox backgroundColor="red">Total Cost</FinanceBox>
      <FinanceBox backgroundColor="green" children="Total Profit" />
    </FinanceContainer>
  );
}

export default App;
