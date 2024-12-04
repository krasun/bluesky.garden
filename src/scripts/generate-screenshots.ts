import * as fs from "fs";
import * as screenshotone from "screenshotone-api-sdk";
import tools from "~/tools.json";

const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY!;
const secretKey = process.env.SCREENSHOTONE_SECRET_KEY!;

const client = new screenshotone.Client(accessKey, secretKey);
for (const tool of tools) {
    const screenshotPath = `./src/${tool.screenshotPath}`;
    if (fs.existsSync(screenshotPath)) {
        console.log(`Screenshot already exists for ${tool.name}, skipping...`);
        continue;
    }

    console.log(`Generating screenshot for ${tool.name}...`);
    const options = screenshotone.TakeOptions.url(tool.url)
        .delay(3)
        .blockAds(true)
        .blockCookieBanners(true)
        .blockTrackers(true)
        .format("webp");

    const imageBlob = await client.take(options);
    fs.writeFileSync(screenshotPath, new Uint8Array(await imageBlob.arrayBuffer()));
}
