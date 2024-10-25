import { config } from "@/data/site-config";
import { initCMS } from "@/libs/content-management";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
	const cms = await initCMS();
	const pageLinks = cms
		.getPages()
		.map((p) => {
			if (!p.allow_index) {
				return undefined;
			}
			return `/${p.slug}`;
		})
		.filter((v) => v !== undefined);
	return {
		rules: {
			userAgent: "*",
			allow: ["/$", "/post/"].concat(pageLinks),
			disallow: "/",
		},
		sitemap: `https://${config.blog.hostname}/sitemap.xml`,
	};
}
