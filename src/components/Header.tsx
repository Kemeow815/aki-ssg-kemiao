import { config } from "@/data/site-config";
import Link from "next/link";
import "@/styles/header.css";

export default async function Header() {
	return (
		<header>
			<div className="header-wrap">
				<div className="header-meta-wrap">
					<h1 className="header-title">
						<Link href="/">{config.blog.title}</Link>
					</h1>
					<p className="header-description">{config.blog.description}</p>
				</div>
			</div>
			<div className="header-filter"></div>
			<div className="header-gradient"></div>
		</header>
	);
}
