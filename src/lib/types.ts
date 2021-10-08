export enum Page {
  ARTICLES = "articles",
  AUDIO = "audio",
  STORIES = "stories",
  // LESSONS = "lessons",
}

export interface Article {
  type: Page.ARTICLES;
  title: string;
  subtitle: string;
  duration: string;
  html: string;
  thumbnail: string;
}
export interface Audio {
  type: Page.AUDIO;
  title: string;
  duration: string;
  url: string;
}

export interface Story {
  type: Page.STORIES;
  title: string;
  images: string[];
}

export type Post = Article | Audio | Story;
