import slugify from "@sindresorhus/slugify";
import * as fs from "fs";

import tools from "~/tools.json";

const index = new Set<string>();
const processedTools = [];
for (const tool of tools) {
    if (index.has(tool.url)) {
        console.log(`Skipping ${tool.name} because it already exists...`);
        continue;
    }
    index.add(tool.url);

    const slug = slugify(tool.name, { decamelize: true });

    let resolvedFaviconAssetPath: string | undefined =
        `assets/favicons/tools/${slug}.png`;
    const faviconPath = `./src/${resolvedFaviconAssetPath}`;
    if (fs.existsSync(faviconPath)) {
        console.log(`Favicon already exists for ${tool.name}, skipping...`);
        resolvedFaviconAssetPath = undefined;
    } else {
        console.log(`Fetching favicon for ${tool.name}...`);
        const faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain_url=${tool.url}`;
        const response = await fetch(faviconUrl);
        if (!response.ok) {
            console.error(
                `Failed to fetch favicon for ${tool.name}, status: ${response.status}`
            );
            resolvedFaviconAssetPath = undefined;
        } else {
            const imageBlob = await response.blob();
            fs.writeFileSync(
                faviconPath,
                new Uint8Array(await imageBlob.arrayBuffer())
            );
        }
    }

    processedTools.push({
        ...tool,
        faviconPath:
            "faviconPath" in tool && tool.faviconPath
                ? tool.faviconPath
                : resolvedFaviconAssetPath,
    });
}

processedTools.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync("./src/tools.json", JSON.stringify(processedTools, null, 2));
