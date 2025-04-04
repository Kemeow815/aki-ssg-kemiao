export const dynamic = "force-static";

import { config } from "@/data/site-config";
import { initCMS } from "@/libs/content-management";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
	const cms = await initCMS();
	const pageLinks = cms
		.getPages()
		.filter((p) => p.allow_index)
		.map((p) => {
			return `/${p.slug}`;
		});
	return {
		rules: {
			userAgent: "*",
			allow: ["/$", "/post/"].concat(pageLinks),
			disallow: "/",
		},
		sitemap: `https://${config.blog.hostname}/sitemap.xml`,
	};
}
