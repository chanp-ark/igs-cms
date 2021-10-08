import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import ErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import ArticleForm from "../../../components/forms/ArticleForm";
import StoryForm from "../../../components/forms/StoryForm";
import PageLayout from "../../../components/PageLayout";
import { Article, Page, Story } from "../../../lib/types";
import { useGetOneDoc } from "../../../lib/useGetOneDoc";

const EditPage: NextPage = ({}) => {
  const router = useRouter();
  const page = router.query.page as Page;
  const postId = router.query.id as string;
  const { loading, post } = useGetOneDoc(page, postId);

  if (!Object.values(Page).includes(page)) {
    return <ErrorPage statusCode={404} />;
  }

  const content = (() => {
    switch (page) {
      case Page.ARTICLES:
        return <ArticleForm article={post as Article} />;
      case Page.AUDIO:
        return "TODO: Add AudioForm;";
      case Page.STORIES:
        return <StoryForm story={post as Story} />;
    }
  })();

  return (
    <>
      <Head>
        <title>{post ? post.title : "Not found"}</title>
      </Head>
      <PageLayout page={page}>
        {post ? content : null}
        {!loading && !post && <h1>Not found</h1>}
      </PageLayout>
    </>
  );
};

export default EditPage;
