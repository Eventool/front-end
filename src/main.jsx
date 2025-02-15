import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/montserrat";
import "./index.css";
// import { ptBR } from '@mui/material/locale';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import "leaflet/dist/leaflet.css";

dayjs.locale("pt-br");

const theme = createTheme({
  palette: {
    primary: {
      main: "#182F4E",
      lighter: "#d8e4f3",
    },
    secondary: {
      main: "#ef6c00",
    },
    white: {
      main: "#ffffff",
    },
    paper: {
      main: "#f0f0f0",
      dark: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: "black",
        },
      },
    },
  },
  mixins: {
    MuiDataGrid: {
      pinnedBackground: "#00000000",
      containerBackground: "#00000000",
    },
  },
  ptBR,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "paper.main" }}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"pt-br"}
        >
          <App />
        </LocalizationProvider>
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
