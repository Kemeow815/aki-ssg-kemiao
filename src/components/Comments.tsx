"use client";
import dynamic from "next/dynamic";
import { Loading } from "./Loading";
import { config } from "@/data/site-config";
import React from "react";

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
			<div className="w-full flex justify-center items-center flex-col gap-4 mt-4">
				<Loading />
				<p className="font-bold text-xl darkani">加载评论中……</p>
			</div>
		</>
	);
}
