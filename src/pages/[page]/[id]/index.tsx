import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import ErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import ArticleLayout from "../../../components/layout/ArticleLayout";
import AudioLayout from "../../../components/layout/AudioLayout";
import StoryLayout from "../../../components/layout/StoryLayout";
import PageLayout from "../../../components/PageLayout";
import { useGetOneDoc } from "../../../lib/hooks/useGetOneDoc";
import { Article, Audio, Page, Story } from "../../../lib/types";

const IndividualPage: NextPage = ({}) => {
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
        return <ArticleLayout article={post as Article} />;
      case Page.AUDIO:
        return <AudioLayout audio={post as Audio} />;
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
