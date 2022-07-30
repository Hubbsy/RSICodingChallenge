import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {Stack} from '@mui/material';
import theme from './Theme';

import Navbar from "./components/Navbar";
import MainSearch from "./components/MainSearch";
import MainContent from "./components/MainContent";

function App() {

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
      <Stack sx={{
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.background.default,
          padding: "20px"
      }} spacing={2}>

        <Navbar />
        <MainSearch />
        <MainContent />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
