import { config } from "@/data/site-config";
import Link from "next/link";
import "@/styles/footer.css";

export default async function Footer() {
	return (
		<footer>
			<p>
				Copyright © {config.blog.begin_year}-{new Date().getFullYear()}{" "}
				{config.author.name}
			</p>
			<p className="footer-secondary">
				Powered by{" "}
				<Link href="https://github.com/Allenyou1126/aki-ssg">Aki-SSG</Link>
			</p>
			<p className="footer-secondary">
				Last Build: {new Date().toLocaleString()}
			</p>
			<div className="footer-secondary footer-link-wrap">
				<Link className="footer-link" href="/feed.xml">
					RSS Feed
				</Link>
				<Link className="footer-link" href="/sitemap.xml">
					Sitemap
				</Link>
			</div>
		</footer>
	);
}
