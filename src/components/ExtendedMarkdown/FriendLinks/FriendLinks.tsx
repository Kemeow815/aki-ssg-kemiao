/* eslint-disable @next/next/no-img-element */

import { initCMS } from "@/libs/content-management";
import getAvatar from "@/utils/getAvatar";
import Link from "next/link";
import "@/components/ExtendedMarkdown/FriendLinks/style.css";

function FriendLinkItem({ link }: { link: FriendLink }) {
	return (
		<Link href={link.url} className="friend-link-item">
			<img
				alt={`avatar-${link.title}`}
				src={link.avatar}
				className="friend-link-avatar"
				width={80}
				height={80}
			/>
			<div className="friend-link-metadata">
				<p className="friend-link-title">{link.title}</p>
				<p className="friend-link-description">{link.description}</p>
			</div>
		</Link>
	);
}

export default async function FriendLinks() {
	const cms = await initCMS();
	const linkList = cms.getFriendLinks().map((link, index) => {
		link.avatar = link.avatar ?? getAvatar();
		link.description = link.description ?? "";
		return <FriendLinkItem link={link} key={index} />;
	});
	return <div className="friend-link-grid not-prose">{linkList}</div>;
}
