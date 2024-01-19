export interface BlogPost {
  id: string;
  author: string;
  title: string;
  date: string;
  shortDescription: string;
  tags: string[];
}

export interface FullBlogPost extends BlogPost {
  body: string; // Markdown content
  comments: Comment[];
}

export interface PenPost {
  id: string;
  author: string;
  title: string;
  date: string;
  shortDescription: string;
  tags: string[];
}

export interface FullPenPost extends PenPost {
  body: string; // Markdown content
  comments: Comment[];
}

export interface WikiPage {
  slug: string;
  body: string;
}

export interface Comment {
  date: string; // ISO, ie: 2024-01-18T20:11:04.802Z
  author: string;
  message: string; // Markdown content
}
