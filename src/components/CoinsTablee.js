import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
// import numberWithCommas from "./Banner/Carousel";

import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinsTablee = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#800080" },
      type: "dark",
      text: {
        primary: "#800080",
      },
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Crypto Prices by Market Cap
        </Typography>
        <TextField
          style={{
            marginBottom: 20,
            width: "100%",
            border: "1px solid #800080",
          }}
          label="Search for a Coin..."
          variant="outlined"
          InputLabelProps={{
            style: {
              color: "#FF7F50", // Change this color to your desired color
            },
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#FF7F50" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#800080" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => (
                  <TableRow
                    onClick={() => navigate(`/coins/${row.id}`)}
                    key={row.id}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ display: "flex", gap: 15 }}
                    >
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginRight: 10 }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            color: "white",
                            textTransform: "uppercase",
                            fontSize: 22,
                          }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: "darkgray" }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color:
                          row.price_change_percentage_24h > 0
                            ? "rgb(14, 203, 129)"
                            : "red",
                        fontWeight: 500,
                      }}
                    >
                      {row.price_change_percentage_24h > 0 && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {numberWithCommas(row.market_cap.toString())}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTablee;
