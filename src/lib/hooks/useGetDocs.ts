import { DocumentData } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { getAllDocs } from "../posts";
import { Page } from "../types";

export const useGetDocs = (page: Page) => {
  const [postList, setPostList] = useState<DocumentData[]>([]);

  useEffect(() => {
    async function getDocs() {
      try {
        const docList = await getAllDocs(page);
        setPostList(docList);
      } catch (error) {
        console.error("Failed to get all docs", (error as any).message);
      }
    }
    getDocs();
  }, [page]);

  return postList;
};
