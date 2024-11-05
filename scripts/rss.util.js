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
 *
 * @param {string} xml
 * @returns {RSSChannel}
 */
export function parseRSS(xml) {
  const channel = xml.match(/<channel>[\s\S]*<\/channel>/)[0];

  const items = channel.match(/<item>[\s\S]*?<\/item>/g) || [];

  // 채널 정보 파싱
  const channelInfo = {
    title: getTagContent(channel, "title"),
    description: getTagContent(channel, "description"),
    link: getTagContent(channel, "link"),
    lastBuildDate: getTagContent(channel, "lastBuildDate"),
    items: items.map((item) => ({
      title: getTagContent(item, "title"),
      description: getTagContent(item, "description"),
      link: getTagContent(item, "link"),
      guid: getTagContent(item, "guid"),
      pubDate: getTagContent(item, "pubDate"),
      author: getTagContent(item, "author"),
      category: getTagContent(item, "category"),
    })),
  };

  return channelInfo;
}

/**
 *
 * @param {string} str
 * @param {string} tag
 * @returns {string}
 */
export function getTagContent(str, tag) {
  const regex = new RegExp(`<${tag}>[\\s\\S]*?<\/${tag}>`);
  const match = str.match(regex);
  if (!match) return "";

  return match[0]
    .replace(`<${tag}>`, "")
    .replace(`</${tag}>`, "")
    .trim()
    .replace(/^\s*<!\[CDATA\[(.*)\]\]>\s*$/, "$1"); // CDATA 처리
}

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
