import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import ErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import ArticleForm from "../../../components/forms/ArticleForm";
import AudioForm from "../../../components/forms/AudioForm";
import StoryForm from "../../../components/forms/StoryForm";
import { useDoc } from "../../../lib/dataContext";
import { Article, Audio, Page, Story } from "../../../lib/types";

const EditPage: NextPage = ({}) => {
  const router = useRouter();
  const page = router.query.page as Page;
  const postId = router.query.id as string;
  const { post, loading } = useDoc(page, postId);

  if (!Object.values(Page).includes(page)) {
    return <ErrorPage statusCode={404} />;
  }

  const content = (() => {
    switch (page) {
      case Page.ARTICLES:
        return <ArticleForm postId={postId} article={post as Article} />;
      case Page.AUDIO:
        return <AudioForm postId={postId} audio={post as Audio} />;
      case Page.STORIES:
        return <StoryForm postId={postId} story={post as Story} />;
    }
  })();

  return (
    <>
      <Head>
        <title>{post ? post.title : "Not found"}</title>
      </Head>
      {post ? content : null}
      {!loading && !post && <h1>Not found</h1>}
    </>
  );
};

export default EditPage;
