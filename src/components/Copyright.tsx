import { config } from "@/data/site-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreativeCommons } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import "@/styles/utils.css";

export default async function Copyright({
	title,
	id,
	cc,
}: {
	title: string;
	id: number;
	cc?: string;
}) {
	cc = cc ?? "CC BY-NC-SA 4.0";
	return (
		<div className="copyright-wrap">
			<p className="copyright-title">{title}</p>
			<Link
				className="copyright-link"
				href={`https://${config.blog.hostname}/post/${id}`}>{`https://${config.blog.hostname}/post/${id}`}</Link>
			<div className="copyright-grid">
				<div>
					<p className="copyright-grid-title">本文作者</p>
					<p className="copyright-grid-content">{config.author.name}</p>
				</div>
				<div>
					<p className="copyright-grid-title">授权协议</p>
					<p className="copyright-grid-content">{cc}</p>
				</div>
			</div>
			<FontAwesomeIcon className="copyright-icon" icon={faCreativeCommons} />
		</div>
	);
}
