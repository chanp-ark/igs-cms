import { DocumentData } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { getOneDoc } from "../posts";
import { Page } from "../types";

export const useGetOneDoc = (page: Page, postId: string) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<DocumentData>();

  useEffect(() => {
    async function getDocs() {
      try {
        const doc = await getOneDoc(page, postId);
        setPost(doc);
        setLoading(false);
      } catch (error) {
        console.error("Failed to get doc id", (error as any).message);
      }
    }
    getDocs();
  }, [page, postId]);

  return { loading, post };
};
