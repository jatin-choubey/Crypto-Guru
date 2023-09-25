import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
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
  styled,
  TablePagination,
} from "@mui/material";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTablee = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10); // Set the rows per page here

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: "#2A2F4F",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#6554AF",
    },
    fontFamily: "Montserrat",
  }));

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
              color: "white", // Coral
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
                {handleSearch()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow
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
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
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
                      <TableCell style={{ color: "#E384FF" }} align="right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
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
                      <TableCell style={{ color: "#E384FF" }} align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString() /*.slice(0, -6)*/
                        )}
                      </TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={handleSearch().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          // Position the pagination in the middle
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTablee;
