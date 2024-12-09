// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://bluesky.garden",
    integrations: [
        tailwind(),
        sitemap({
            // add only dedicated tool and category pages to the sitemap
            filter: (page) =>
                page.includes("tools/") || page.includes("categories/"),
        }),
    ],
});
