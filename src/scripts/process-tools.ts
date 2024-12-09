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
    processedTools.push({
        ...tool,
    });
}

processedTools.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync("./src/tools.json", JSON.stringify(processedTools, null, 2));
