import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				furry: "url('https://blog-oss.allenyou.top/image/658ad4c208349.png')",
			},
			colors: {
				primary: "#6db0ec",
			},
			fontFamily: {
				crf: ["ChillRoundF"],
			},
			typography: ({ theme }: any) => ({
				ay: {
					css: {
						"--tw-prose-links": theme("colors.primary"),
						"--tw-prose-invert-body": theme("colors.gray[200] / 80%"),
						"--tw-prose-invert-headings": theme("colors.gray[300] / 80%"),
						"--tw-prose-invert-lead": theme("colors.gray[300] / 80%"),
						"--tw-prose-invert-links": theme("colors.primary / 80%"),
						"--tw-prose-invert-bold": theme("colors.gray[300] / 80%"),
						"--tw-prose-invert-counters": theme("colors.gray[300] / 90%"),
						"--tw-prose-invert-bullets": theme("colors.gray[300] / 80%"),
						"--tw-prose-invert-hr": theme("colors.gray[300] / 80%"),
						"--tw-prose-invert-quotes": theme("colors.gray[100] / 80%"),
						"--tw-prose-invert-quote-borders": theme("colors.gray[300] / 80%"),
						"--tw-prose-invert-captions": theme("colors.gray[400] / 80%"),
						"--tw-prose-invert-code": theme("colors.gray[300] / 80%"),
						"--tw-prose-invert-pre-code": theme("colors.gray[300] / 80%"),
						"--tw-prose-invert-pre-bg": "rgb(0 0 0)",
						"--tw-prose-invert-th-borders": theme("colors.gray[300] / 80%"),
						"--tw-prose-invert-td-borders": theme("colors.gray[300] / 80%"),
					},
				},
			}),
		},
		darkMode: "class",
		hljs: {
			theme: "night-owl",
		},
	},
	plugins: [require("@tailwindcss/typography"), require("tailwind-hljs")],
};
export default config;
