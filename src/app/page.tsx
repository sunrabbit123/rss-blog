"use client";

import React, { useEffect, useState } from "react";
import * as styles from "./styles/layout.css";
import { handleArticleDescription } from "./util";

interface BlogItem {
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

interface RSSFeed {
  items: BlogItem[];
  title?: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 30;

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const indexResponse = await fetch("/rss/index.json");
        const feedUrls = await indexResponse.json();

        const allBlogs: BlogItem[] = [];
        for (const url of feedUrls) {
          const feedResponse = await fetch(`/rss/${url}`);
          const feed: RSSFeed = await feedResponse.json();
          const items = feed.items.map((item) => ({
            ...item,
            category: item.category === "" ? undefined : item.category,
            blogTitle: feed.title,
          }));
          allBlogs.push(...items);
        }

        allBlogs.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
        setBlogs(allBlogs.slice(0, page * itemsPerPage));
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <main className={styles.main}>
      {blogs.map((blog, index) => (
        <article key={blog.link + index} className={styles.article}>
          <a href={blog.link} target="_blank" rel="noopener noreferrer">
            {blog.blogTitle && (
              <div className={styles.blogTitle}>{blog.blogTitle}</div>
            )}
            <h2 className={styles.articleTitle}>{blog.title}</h2>
            <p className={styles.articleDescription}>
              {handleArticleDescription(blog.description)}
            </p>
            <div className={styles.articleFooter}>
              {blog.category && (
                <div className={styles.categoryContainer}>
                  <span className={styles.category}>{blog.category}</span>
                </div>
              )}
              <time className={styles.articleDate}>
                {new Date(blog.pubDate).toLocaleDateString()}
              </time>
            </div>
          </a>
        </article>
      ))}
    </main>
  );
}
