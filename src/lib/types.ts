export enum Page {
  ARTICLES = "articles",
  GREETINGS = "greetings",
  SOUNDS = "sounds",
  STORIES = "stories",
}

export interface Article {
  title: string;
  subtitle: string;
  body: string;
  image: string;
  duration: number;
}

export interface Greeting {
  title: string;
  greeting: string;
}

export interface Sound {
  title: string;
  audio: string; // is this a url?
  duration: number; // number of seconds?
  background: string;
}

export interface Story {
  title: string;
  images: string[]; // array of url?
  duration: number;
  background: string;
}
