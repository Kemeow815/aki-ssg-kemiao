"use client";
import dynamic from "next/dynamic";
import { Loading } from "./Loading";
import { config } from "@/data/site-config";
import React from "react";
import "@/styles/comment.css";

const availableComments: Record<
	SiteConfig["comment"]["type"],
	() => Promise<React.FC>
> = {
	disable: async () => import("@/components/NoComments") as unknown as React.FC,
	waline: async () =>
		import("@/components/WalineComments") as unknown as React.FC,
};

export const Comments = dynamic(availableComments[config.comment.type], {
	ssr: false,
	loading: () => {
		return <CommentsLoading />;
	},
});

export function CommentsLoading() {
	return (
		<>
			<div id="comment-loading">
				<Loading />
				<p id="comment-loading-text">加载评论中……</p>
			</div>
		</>
	);
}
