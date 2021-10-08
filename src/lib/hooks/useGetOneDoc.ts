import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Page } from "../types";

export const useGetOneDoc = (page: Page, postId: string) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<DocumentData>();

  useEffect(() => {
    async function fetch() {
      try {
        const document = await getDoc(doc(db, page, postId));
        setPost(document.data());
        setLoading(false);
      } catch (error) {
        console.error("Failed to get doc id", (error as any).message);
      }
    }
    fetch();
  }, [page, postId]);

  return { loading, post };
};
