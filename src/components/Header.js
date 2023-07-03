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
  color: "#FF7F50",
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
      primary: { main: "#800080" },
      type: "dark",
      text: {
        primary: "#800080",
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
                color: "#FF7F50",
                fontSize: "15px",
                backgroundColor: "#14161a",
                border: "1px solid #800080",
              }}
              value={currency} // Set the initial value here
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"} style={{ color: "#FF7F50" }}>
                INR
              </MenuItem>
              <MenuItem value={"USD"} style={{ color: "#FF7F50" }}>
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
