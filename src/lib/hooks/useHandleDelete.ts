import { useRouter } from "next/dist/client/router";
import { useDataContext } from "../dataContext";
import { deletePost } from "../posts";
import { Page } from "../types";

export const useHandleDelete = () => {
  const router = useRouter();
  const page = router.query.page as Page;
  const postId = router.query.id as string;
  const { refetch } = useDataContext(page);

  const handleDelete = () => {
    deletePost(page, postId);
    refetch();
    router.push(`/${page}`);
  };

  return handleDelete;
};
