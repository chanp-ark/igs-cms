import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import ErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import ArticleContent from "../../../components/content/ArticleContent";
import AudioContent from "../../../components/content/AudioContent";
import StoryContent from "../../../components/content/StoryContent";
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
        return <ArticleContent article={post as Article} />;
      case Page.AUDIO:
        return <AudioContent audio={post as Audio} />;
      case Page.STORIES:
        return <StoryContent story={post as Story} />;
    }
  })();

  return (
    <>
      <Head>
        <title>{post ? post.title : "Not found"}</title>
      </Head>
      {post ? content : !loading && <h1>Not found</h1>}
    </>
  );
};

export default IndividualPage;
