export enum Page {
  ARTICLES = "articles",
  AUDIO = "audio",
  STORIES = "stories",
  // LESSONS = "lessons",
}

export interface Article {
  title: string;
  subtitle: string;
  duration: string;
  body: string;
  image: string;
}
export interface Audio {
  title: string;
  image: string;
  duration: string;
}

export interface Story {
  title: string;
  images: string[]; // array of url?
}
