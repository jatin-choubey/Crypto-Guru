import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = {
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
};

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
      text: {
        primary: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              style={useStyles}
            >
              Crypto Guru
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "black",
                backgroundColor: "white",
                border: "6px solid gold",
              }}
              value={currency} // Set the initial value here
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"} style={{ color: "black" }}>
                INR
              </MenuItem>
              <MenuItem value={"USD"} style={{ color: "black" }}>
                USD
              </MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
