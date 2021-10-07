import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import ErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import ArticleForm from "../../components/forms/ArticleForm";
import PageLayout from "../../components/PageLayout";
import { Article, Page } from "../../lib/types";
import { useGetOneDoc } from "../../lib/useGetOneDoc";

const IndividualPage: NextPage = ({}) => {
  const router = useRouter();
  const page = router.query.page as Page;
  const postId = router.query.id as string;
  const { loading, post } = useGetOneDoc(page, postId);

  if (loading) {
    return null;
  }

  if (!Object.values(Page).includes(page) || !post) {
    return <ErrorPage statusCode={404} />;
  }

  const content = (() => {
    switch (page) {
      case Page.ARTICLES:
        return <ArticleForm />;
      case Page.GREETINGS:
        return page;
      case Page.SOUNDS:
        return page;
      case Page.STORIES:
        return page;
    }
  })();

  return (
    <>
      <Head>
        <title>New {page}</title>
      </Head>
      <PageLayout page={page}>
        <div>{content}</div>
      </PageLayout>
    </>
  );
};

export default IndividualPage;
