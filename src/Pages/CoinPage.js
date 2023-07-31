import React from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { useState } from "react";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { useEffect } from "react";
import CoinInfo from "../components/CoinInfo";
import { styled } from "@mui/system";
import { LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export function numberWithCommas(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "";
}

const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const coinStyles = {
  heading: {
    fontWeight: "bold",
    marginBottom: "20",
    fontFamily: "Montserrat",
    padding: "5px",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
};
const marketData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  // if (!coin) return <LinearProgress style={{ backgroundColor: " gold" }} />;

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" style={coinStyles.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" style={coinStyles.description}>
          {coin?.description.en && parse(coin.description.en.split(". ")[0])}
        </Typography>
        <marketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={coinStyles.heading}>
              Rank :
            </Typography>
            &nbsp;
            <Typography
              variant="h5"
              style={{ marginTop: "5px", fontFamily: "Montserrat" }}
            >
              &nbsp;{coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={coinStyles.heading}>
              Current Price :
            </Typography>
            &nbsp;
            <Typography
              variant="h5"
              style={{ marginTop: "5px", fontFamily: "Montserrat" }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={coinStyles.heading}>
              Market Cap :
            </Typography>
            &nbsp;
            <Typography
              variant="h5"
              style={{ marginTop: "5px", fontFamily: "Montserrat" }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
              )}
            </Typography>
          </span>
        </marketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
