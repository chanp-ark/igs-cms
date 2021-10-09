import { useRouter } from "next/dist/client/router";
import { useCallback, useState } from "react";
import { useAlertContext } from "../alertContext";
import { useDataContext } from "../dataContext";
import { createPost, updatePost } from "../posts";
import { Page, Post } from "../types";

export const useHandleSubmitPost = (page: Page) => {
  const router = useRouter();
  const { setAlert } = useAlertContext();
  const { refetch } = useDataContext(page);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitPost = useCallback(
    async (post: Post, postId?: string, files?: File | File[]) => {
      const formFilled = Object.values(post).every((entry) => entry !== "");
      if (!formFilled) {
        setAlert("Empty form, please fill in all fields");
        return;
      }
      setIsSubmitting(true);

      if (postId && post) {
        await updatePost(postId, page, post);
        setAlert("Post updated!");
        setIsSubmitting(false);
        router.push(`/${Page.ARTICLES}/${postId}`);
      } else {
        if (!files) {
          alert("No file?");
          return;
        }
        const newPostId = await createPost(Page.ARTICLES, post, files);
        setAlert("Post successful!");
        setIsSubmitting(false);
        router.push(`/${Page.ARTICLES}/${newPostId}`);
      }

      refetch();
    },
    [page, refetch, router, setAlert]
  );

  return {
    handleSubmitPost,
    isSubmitting,
  };
};
