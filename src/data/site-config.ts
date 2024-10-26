import { createConfig } from "../utils/createConfig";

export const config: SiteConfig = createConfig({
	comment: {
		enabled: true,
		waline_api: "https://waline.allenyou.wang/",
	},
});
