import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import ErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import PageLayout from "../../../components/PageLayout";
import Article from "../../../layout/Article";
import StoryLayout from "../../../layout/StoryLayout";
import { Article as ArticleType, Page, Story } from "../../../lib/types";
import { useGetOneDoc } from "../../../lib/useGetOneDoc";

const IndividualPage: NextPage = ({}) => {
  const router = useRouter();
  const page = router.query.page as Page;
  const postId = router.query.id as string;
  const { loading, post } = useGetOneDoc(page, postId);

  if (!Object.values(Page).includes(page)) {
    return <ErrorPage statusCode={404} />;
  }

  if (!post) {
    return null;
  }

  const content = (() => {
    switch (page) {
      case Page.ARTICLES:
        return <Article article={post as ArticleType} />;
      case Page.AUDIO:
        return "TODO: Add AudioForm;";
      case Page.STORIES:
        return <StoryLayout story={post as Story} />;
    }
  })();

  return (
    <>
      <Head>
        <title>{post ? post.title : "Not found"}</title>
      </Head>
      <PageLayout page={page}>
        {post ? content : !loading && <h1>Not found</h1>}
      </PageLayout>
    </>
  );
};

export default IndividualPage;
