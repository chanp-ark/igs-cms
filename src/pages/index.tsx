import { Typography } from "@mui/material";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  return (
    <Typography variant="h1" sx={{ textAlign: "center", marginTop: "4rem" }}>
      Welcome to BabySleepy
    </Typography>
  );
};

export default Home;
