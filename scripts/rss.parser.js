import { readFile } from "fs/promises";

/**
 * @typedef {Object} RSSItem
 * @property {string} title - 아이템 제목
 * @property {string} description - 아이템 설명
 * @property {string} link - 아이템 링크
 * @property {string} guid - 아이템 고유 식별자
 * @property {string} pubDate - 발행일
 * @property {string} author - 작성자
 * @property {string} category - 카테고리
 */

/**
 * @typedef {Object} RSSChannel
 * @property {string} title - 채널 제목
 * @property {string} description - 채널 설명
 * @property {string} link - 채널 링크
 * @property {string} lastBuildDate - 마지막 업데이트 날짜
 * @property {RSSItem[]} items - RSS 아이템 목록
 */

/**
 * RSS JSON 파일 읽기
 * @param {string} fileName - RSS file name
 * @returns {Promise<RSSChannel | null>}
 */
export function readRSSJson(fileName) {
  return readFile(fileName, "utf-8")
    .then((v) => JSON.parse(v))
    .catch(() => null);
}

const parseAtom = (feed) => {
  const entries = Array.isArray(feed.entry) ? feed.entry : [feed.entry];

  return {
    title: feed.title || "",
    description: feed.subtitle || feed.description || "",
    link: feed.link?.href || feed.link || "",
    lastBuildDate: feed.updated || "",
    items: entries.map((entry) => ({
      title: entry.title || "",
      description: entry.content || entry.summary || "",
      link: entry.link?.href || entry.link || "",
      guid: entry.id || "",
      pubDate: entry.published || entry.updated || "",
      author: entry.author?.name || "",
      category: entry.category || "",
    })),
  };
};

const parseRSS1 = (rdf) => {
  const channel = rdf.channel;
  const items = Array.isArray(rdf.item) ? rdf.item : [rdf.item];

  return {
    title: channel.title || "",
    description: channel.description || "",
    link: channel.link || "",
    lastBuildDate: channel.date || channel.lastBuildDate || "",
    items: items.map((item) => ({
      title: item.title || "",
      description: item.description || "",
      link: item.link || "",
      guid: item.about || item.link || "",
      pubDate: item.date || "",
      author: item.creator || item.publisher || "",
      category: item.subject || "",
    })),
  };
};

const parseRSS2 = (rss) => {
  const channel = rss.channel;
  const items = Array.isArray(channel.item)
    ? channel.item
    : channel.item
    ? [channel.item]
    : [];

  return {
    title: channel.title || "",
    description: channel.description || "",
    link: channel.link || "",
    lastBuildDate: channel.lastBuildDate || "",
    items: items.map((item) => ({
      title: item.title || "",
      description: item.description || "",
      link: item.link || "",
      guid:
        typeof item.guid === "object" ? item.guid["$text"] : item.guid ?? "",
      pubDate: item.pubDate || "",
      author: item.author || "",
      category: item.category || "",
    })),
  };
};

export const parseRSS = (json) => {
  if (json.feed) return parseAtom(json.feed);
  if (json.rdf) return parseRSS1(json.rdf);
  if (json.rss) return parseRSS2(json.rss);
  return null;
};
