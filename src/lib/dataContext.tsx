import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { Page } from "./types";

interface IPostList {
  articles: DocumentData[];
  audio: DocumentData[];
  stories: DocumentData[];
}

interface IDataContext {
  postList: IPostList;
  loading: boolean;
  fetch: (page: Page) => void;
}

const initialPostList: IPostList = {
  articles: [],
  audio: [],
  stories: [],
};

const DataContext = React.createContext<IDataContext>({
  postList: initialPostList,
  loading: false,
  fetch: () => {},
});

export const DataContextProvider: React.FC = ({ children }) => {
  const [postList, setPostList] = useState<IPostList>(initialPostList);
  const [loading, setLoading] = useState(false);
  const fetch = useCallback(async (page: Page) => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, page));
      const docs: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        docData.id = doc.id;
        docs.push(docData);
      });
      setPostList((p) => ({ ...p, [page]: docs }));
      // Set timeout to make sure postList is updated before setting loading to false
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } catch (error) {
      console.error("Failed to get all docs", (error as any).message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch(Page.ARTICLES);
    fetch(Page.AUDIO);
    fetch(Page.STORIES);
  }, [fetch]);

  return (
    <DataContext.Provider value={{ postList, loading, fetch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (page: Page) => {
  const { postList, fetch } = useContext(DataContext);

  return {
    postList: postList[page],
    refetch: () => fetch(page),
  };
};

export const useDoc = (page: Page, postId: string) => {
  const { postList, loading } = useContext(DataContext);

  return {
    post: postList[page].find((post) => post.id === postId),
    loading,
  };
};
