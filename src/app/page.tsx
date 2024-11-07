"use client";

import React, { useEffect, useState } from "react";
import * as styles from "./styles/layout.css";

interface BlogItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

interface RSSFeed {
  items: BlogItem[];
}

export default function Home() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 9;

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const indexResponse = await fetch("/rss/index.json");
      const feedUrls = await indexResponse.json();

      const allBlogs: BlogItem[] = [];
      for (const url of feedUrls) {
        const feedResponse = await fetch(`/rss/${url}`);
        const feed: RSSFeed = await feedResponse.json();
        allBlogs.push(...feed.items);
      }

      allBlogs.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
      setBlogs(allBlogs.slice(0, page * itemsPerPage));
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    <>
      <header className={styles.header}>
        <h1>RSS Blog</h1>
      </header>
      <main className={styles.main}>
        {blogs.map((blog, index) => (
          <article key={blog.link + index} className={styles.article}>
            <a href={blog.link} target="_blank" rel="noopener noreferrer">
              <h2 className={styles.articleTitle}>{blog.title}</h2>
              <p className={styles.articleDescription}>{blog.description}</p>
              <time className={styles.articleDate}>
                {new Date(blog.pubDate).toLocaleDateString()}
              </time>
            </a>
          </article>
        ))}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 RSS Blog</p>
      </footer>
    </>
  );
}
