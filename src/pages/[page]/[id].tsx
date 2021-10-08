import { capitalize } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import ErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import ArticleForm from "../../components/forms/ArticleForm";
import PageLayout from "../../components/PageLayout";
import { Article as ArticleType, Page } from "../../lib/types";
import Article from '../../layout/Article'

import { useGetOneDoc } from "../../lib/useGetOneDoc";

const IndividualPage: NextPage = ({}) => {
  const router = useRouter();
  const page = router.query.page as Page;
  const postId = router.query.id as string;
  const { loading, post } = useGetOneDoc(page, postId);

  if (!Object.values(Page).includes(page)) {
    return <ErrorPage statusCode={404} />;
  }

  if (!post) {
    return null
  }

  const content = (() => {
    switch (page) {
      case Page.ARTICLES:
        return <Article article={post as ArticleType} />;
      case Page.AUDIO:
        return "TODO: Add AudioForm;";
      case Page.STORIES:
        return "TODO: Add StoryForm;";
    }
  })();

  return (
    <>
      <Head>
        <title>{post ? post.title : "Not found"}</title>
      </Head>
      <PageLayout page={page}>
        <div>
          {post ? content : null}
          {!loading && !post && <h1>Not found</h1>}
        </div>
      </PageLayout>
    </>
  );
};

export default IndividualPage;
