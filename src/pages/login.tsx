import { Box, Button, Input, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useState } from "react";
import { useAuthContext } from "../lib/useAuthContext";
// import { useAlertContext } from "../utils/alertContext";

const LoginForm: React.FC = () => {
  // const { setAlert } = useAlertContext();
  const router = useRouter();
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in fields.");
    } else {
      try {
        await login(email, password);
        router.push("/");
      } catch (error) {
        alert("Your email and/or password are not correct.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 1,
          fontWeight: "bold",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "20vh",
          padding: "3rem 1rem",
        }}
      >
        <Typography variant="h4" gutterBottom={true}>
          CMS Sign In
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "250px",
          }}
        >
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            value={email}
            style={{ marginBottom: "1rem" }}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
            style={{ marginBottom: "1rem" }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "1rem" }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </>
  );
};

export default LoginForm;
