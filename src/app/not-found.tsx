import { config } from "@/data/site-config";
import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/not-found.css";

export const metadata: Metadata = {
	title: `404 - ${config.blog.title}`,
};

export default async function NotFound() {
	return (
		<div id="not-found-wrap">
			<p id="not-found-text">404 Not Found</p>
			<Link id="not-found-button" href="/">
				返回首页
			</Link>
		</div>
	);
}
