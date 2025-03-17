"use client";

import type { Link, List, ListItem, Text } from "mdast";
import type { ReactNode } from "react";

function rendToc(toc: List | ListItem, index: number = 0): ReactNode {
	if (toc.type === "list") {
		return (
			<ul key={index} className="pl-8 w-full opacity-90 font-medium">
				{toc.children.map((it, index) => {
					return rendToc(it, index);
				})}
			</ul>
		);
	}
	if (toc.children.length === 0) {
		return [];
	}
	const ret: ReactNode[] = [];
	toc.children.forEach((item, ind) => {
		if (item.type === "paragraph") {
			ret.push(
				<button
					key={ind}
					className="hover:opacity-80"
					onClick={() => {
						setTimeout(() => {
							document
								.getElementById(
									`user-content-${(item.children[0] as Link).url.substring(1)}`
								)!
								.scrollIntoView({ block: "center" });
						}, 10);
					}}>
					{((item.children[0] as Link).children[0] as Text).value}
				</button>
			);
			return;
		}
		if (item.type !== "list") {
			return;
		}
		ret.push(rendToc(item, ind));
	});
	return <li key={index}>{ret}</li>;
}

export default function Toc({ toc }: { toc: List }) {
	if (toc === undefined) {
		return <></>;
	}
	const tocContent: ReactNode = rendToc(toc);
	return (
		<div className="hidden 2xl:block absolute left-4 h-full">
			<div className="h-40"></div>
			<div className="sticky top-28 w-80 overflow-y-auto text-wrap h-[85vh]">
				{tocContent}
			</div>
		</div>
	);
}
