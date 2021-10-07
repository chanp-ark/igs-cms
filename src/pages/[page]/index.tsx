import { capitalize } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import ErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import PageLayout from "../../components/PageLayout";
import { Page } from "../../lib/types";

const IndividualPage: NextPage = ({}) => {
  const router = useRouter();
  const page = router.query.page as Page;

  if (!page) {
    return null;
  }

  if (!Object.values(Page).includes(page)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{capitalize(page)}</title>
      </Head>
      <PageLayout page={page}>
        <h1>{capitalize(page)}</h1>
      </PageLayout>
    </>
  );
};

export default IndividualPage;
