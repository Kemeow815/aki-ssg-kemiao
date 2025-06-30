import type { Metadata } from "next";
import "@/styles/fonts/chillroundf.css";
import "@/styles/globals.css";
import "@/styles/normalize.css";
import { config } from "@/data/site-config";
import Navigation from "@/components/Navigation";
import CommonLogic from "@/components/LogicComponents/CommonLogic";
import { initCMS } from "@/libs/content-management";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";

export const metadata: Metadata = {
	title: config.blog.title,
	description: config.blog.description,
	icons: {
		icon: config.blog.favicon,
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cms = await initCMS();
	const links = cms
		.getPages()
		.filter((p) => p.navigation_title !== undefined)
		.sort((a, b) => a.navigation_index - b.navigation_index)
		.map((p) => {
			return {
				title: p.navigation_title!,
				url: `/${p.slug}`,
			};
		})
		.concat(config.extra_links);
	return (
		<html className="font-crf scroll-smooth" lang="zh-CN">
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `!function(){var t=localStorage.getItem("dark-mode"),a=document.documentElement.classList;("dark"===t||("auto"===t&&window.matchMedia("(prefers-color-scheme: dark)").matches))&&a.add("dark")}();`,
					}}
				/>
			</head>
			<body className="bg-color text-color transition-colors duration-500">
				<Navigation links={links} />
				<Header />
				<main
					id="main"
					className="flex justify-center -mt-32 z-10 relative w-full gap-4">
					<div className="rounded-3xl bg-color bg-blur w-full max-w-4xl mx-auto md:w-4xl p-6 min-h-48 transition-colors duration-500">
						{children}
					</div>
				</main>
				<Footer />
				<CommonLogic />
				<GoToTop />
			</body>
		</html>
	);
}
