import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import { Page, Post } from "./types";

const uploadFileToStorage = async (page: Page, file: File) => {
  const folder = page === Page.AUDIO ? "sounds/" : "images/";
  const fileRef = ref(storage, folder + file.name);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export const createPost = async (
  page: Page,
  post: Post,
  files: File | File[]
) => {
  if (Array.isArray(files)) {
    const urls = await Promise.all(
      files.map(async (file) => await uploadFileToStorage(page, file))
    );
    if (post.type === Page.STORIES) {
      post.images = urls;
    }
  } else {
    const url = await uploadFileToStorage(page, files);
    if (post.type === Page.ARTICLES) {
      post.thumbnail = url;
    } else if (post.type === Page.AUDIO) {
      post.url = url;
    }
  }

  const { type, ...newPost } = post;
  const doc = await addDoc(collection(db, page), newPost);
  return doc.id;
};

export const updatePost = async (
  postId: string,
  page: Page,
  post: Post,
  files?: File | File[]
) => {
  if (files) {
    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file: any) => await uploadFileToStorage(page, file))
      );
      if (post.type === Page.STORIES) {
        post.images = urls;
      }
    } else {
      const url = await uploadFileToStorage(page, files);
      if (post.type === Page.ARTICLES) {
        post.thumbnail = url;
      } else if (post.type === Page.AUDIO) {
        post.url = url;
      }
    }
  }

  const docToUpdate = doc(db, page, postId);
  const { type, ...updatedPost } = post;
  await updateDoc(docToUpdate, updatedPost as any);
};

export const deletePost = async (page: Page, postId: string) => {
  const docReference = doc(db, page, postId);
  await deleteDoc(docReference);
};
