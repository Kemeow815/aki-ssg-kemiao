"use client";
import dynamic from "next/dynamic";
import { Loading } from "./Loading";
import { config } from "@/data/site-config";

// export const Comments = dynamic(() => import("@/components/WalineComments"), {
// 	ssr: false,
// 	loading: () => {
// 		return <CommentsLoading />;
// 	},
// });
export const Comments = dynamic(
	() => {
		if (config.comment.enabled) {
			return import("@/components/NewWalineComments");
		}
		return import("@/components/NoComments");
	},
	{
		ssr: false,
		loading: () => {
			return <CommentsLoading />;
		},
	}
);

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
