import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Page } from "../types";

export const useGetDocs = (page: Page) => {
  const [postList, setPostList] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, page));
        const docs: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          docs.push(docData);
        });
        setPostList(docs);
      } catch (error) {
        console.error("Failed to get all docs", (error as any).message);
      }
    };
    fetch();
  }, [page]);

  return postList;
};
