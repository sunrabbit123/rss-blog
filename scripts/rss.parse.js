import rssLinkList from "../assets/rss.link.json" assert { type: "json" };
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { deduplicate } from "./util.js";
import { parseRSS, readRSSJson } from "./rss.util.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

Promise.all(
  rssLinkList.map(async (link) => {
    const res = await fetch(link);
    if (!res.ok) {
      console.error(`HTTP ERROR, status: ${res.status}`);
      return null;
    }

    return [await res.text(), link];
  })
)
  .then((xmlList) =>
    xmlList.flatMap(([xml, link]) => {
      if (xml === null) {
        return [];
      }

      const fileName = path.join(
        __dirname,
        "../rss",
        `${link.replaceAll("/", "_").replaceAll(":", "_")}.json`
      );
      return readRSSJson(fileName).then((rss) => {
        if (rss === null) {
          return;
        }

        const parsed = parseRSS(xml);
        rss.title = parsed.title;
        rss.link = parsed.link;
        rss.description = parsed.description;
        rss.lastBuildDate = parsed.lastBuildDate;
        rss.items = deduplicate([...rss.items, ...parsed.items], (v) => v.guid);
        return writeFile(
          fileName,
          JSON.stringify(parsed, null, 2),
          "utf-8"
        ).then(() => fileName);
      });
    })
  )
  .then((v) => {
    readFile("../rss/index.json", "utf-8").then((str) => {});
  });
