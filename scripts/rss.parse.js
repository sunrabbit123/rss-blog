import rssLinkList from "../assets/rss.link.json" with { type: "json" };
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import XMLParser from "./xml.parser.js";
import { deduplicate } from "./util.js";
import { parseRSS, readRSSJson } from "./rss.parser.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RssIndexFileName = path.join(__dirname, "../public/rss/index.json");
const CharSet = "utf-8";
const xmlParser = new XMLParser({
  attributeNamePrefix: '',
  textNodeName: '$text',
  ignoreAttributes: false,
});

Promise.all(
  rssLinkList.map(async (link) => {
    const res = await fetch(link);
    if (!res.ok) {
      console.error(`HTTP ERROR, status: ${res.status}`);
      return [null, link];
    }

    return await res.text().then(v => [xmlParser.parse(v), link]);
  })
)
  .then((xmlList) =>
    xmlList.flatMap(([xml, link]) => {
      if (xml === null) {
        return [];
      }

      const fileName = path.join(
        __dirname,
        "../public/rss",
        `${link.replaceAll("/", "_").replaceAll(":", "_")}.json`
      );
      return readRSSJson(fileName).then((rss) => {
        const parsed = parseRSS(xml);
        const data = {
          title: parsed.title,
          description: parsed.description,
          link: parsed.link,
          lastBuildDate: parsed.lastBuildDate,
          items: deduplicate(
            [...(rss?.items ?? []), ...parsed.items],
            (v) => v.guid
          ),
        };

        return writeFile(fileName, JSON.stringify(data, null, 2), CharSet).then(
          () => `./${fileName.split("/rss/")[1]}`
        );
      });
    })
  )
  .then(async (v) => {
    const str = await readFile(RssIndexFileName, CharSet).catch(() => "[]");
    const fileNameSet = new Set(JSON.parse(str));
    return await Promise.all(v)
      .then((v) => v.filter((v) => !!v).forEach((v) => fileNameSet.add(v)))
      .then(() => Array.from(fileNameSet));
  })
  .then((v) =>
    writeFile(RssIndexFileName, JSON.stringify(v, null, 2), CharSet)
  );
