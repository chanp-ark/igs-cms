import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";

const fileType = {
  articles: "image",
  sounds: "audio",
  stories: "images",
};

const getOneDoc = async (page, id) => {
  try {
    const document = await getDoc(doc(db, page, id));
    return document.data();
  } catch (error) {
    console.error("Failed to fetch document with id: ", id);
  }
};

const uploadFileToStorage = async (file, page) => {
  let returnLinkForFormData;
  const folder = page === "sounds" ? "sounds/" : "images/";
  const fileRef = ref(storage, folder + file.name);
  console.log("uploadFileToStorage fileRef", fileRef);
  await uploadBytes(fileRef, file).then(async (snapshot) => {
    await getDownloadURL(snapshot.ref).then((dURL) => {
      console.log("this is durl", dURL);
      returnLinkForFormData = dURL;
    });
  });
  console.log("returnLinkForFOrmData after uploadByte", returnLinkForFormData);
  return returnLinkForFormData;
};

const getAllDocs = async (page) => {
  if (page.length !== 0) {
    const querySnapshot = await getDocs(collection(db, page));
    const queryArray = [];
    querySnapshot.forEach((doc) => {
      const newObj = doc.data();
      newObj.id = doc.id;
      queryArray.push(newObj);
    });
    return queryArray;
  }
  return [];
};

const submitNewDoc = async (page, formState) => {
  console.log("now submitting form");
  if (formState[fileType[page]]) {
    const uploadFile = formState[fileType[page]];
    const newUploadLink = await uploadFileToStorage(uploadFile, page);
    console.log("new file", newUploadLink);
    formState[fileType[page]] = newUploadLink;
  }
  console.log("formstate after submit and file", formState);
  const newDoc = await addDoc(collection(db, page), formState);
  console.log("new doc", newDoc.bucket);
};

const updatePost = async (page, postId, formState) => {
  if (formState[fileType[page]]) {
    const uploadFile = formState[fileType[page]];
    const newUploadLink = await uploadFileToStorage(uploadFile, page);
    console.log("new file", newUploadLink);
    formState[fileType[page]] = newUploadLink;
  }
  console.log("now updating doc");
  const edittedFormState = { ...formState };
  delete edittedFormState.id;
  const currentDoc = doc(db, page, postId);
  await updateDoc(currentDoc, edittedFormState);
  console.log("finishing up update");
};

export { getOneDoc, getAllDocs, submitNewDoc, updatePost };
