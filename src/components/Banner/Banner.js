import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const bannerStyles = {
  banner: {
    backgroundImage: "url(./banner2.jpg)",
    backgroundSize: "cover",
  },
  bannerContent: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    marginBottom: "25%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
};

function Banner() {
  return (
    <div style={bannerStyles.banner}>
      <Container style={bannerStyles.bannerContent}>
        <div style={bannerStyles.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Guru
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              color: "lightgray",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: "20px",
            }}
          >
            Unlock the Secrets of the Crypto World and become a{" "}
            <strong style={{ fontWeight: "bold" }}>Crypto Guru</strong>
            ✨✨
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
