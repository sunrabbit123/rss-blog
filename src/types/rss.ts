export interface BlogItem {
  title: string;
  description:
    | string
    | {
        $text: string;
        type: string;
      };
  link: string;
  pubDate: string;
  blogTitle?: string;
  category?: string;
}

export interface RSSFeed {
  items: BlogItem[];
  title?: string;
}
