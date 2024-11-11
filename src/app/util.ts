import { BlogItem } from "@/types/rss";

export const handleArticleDescription = (
  blogDescription: BlogItem["description"]
) => {
  if (typeof blogDescription === "string") {
    return blogDescription;
  }

  if (typeof blogDescription === "object" && blogDescription.type !== "html") {
    return blogDescription["$text"];
  }

  const res = blogDescription["$text"]
    .replace(/<[^>]*>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n+/g, "\n")
    .trim();
  return res;
};
