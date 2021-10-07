import type { NextPage } from "next";
import React from "react";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <h1>Welcome to BabySleepy</h1>
    </>
  );
};

export default Home;
