import { config } from "@/data/site-config";
import { initCMS } from "@/libs/content-management";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export var metadata: Metadata = {
	title: `页面 - ${config.blog.title}`,
	description: "没有描述",
};

export async function generateStaticParams() {
	const cms = await initCMS();
	return cms.getPageSlug();
}

export default async function CustomPage(params: { slug: string }) {
	const cms = await initCMS();
	const page = cms.getPage((await params).slug);
	if (page === undefined) {
		notFound();
	}
	metadata = {
		title: `${page.title} - ${config.blog.title}`,
	};
	return (
		<>
			<div className="rounded-3xl bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg w-full max-w-4xl mx-auto md:w-4xl p-6 min-h-48">
				<p className="text-3xl font-bold my-2">{page.title}</p>
				<div className="prose prose-ay dark:prose-invert max-w-4xl break-all my-8">
					{page.markdown_content.toReactNode()}
				</div>
				{/* {page.enable_comment && <Comments />} */}
			</div>
		</>
	);
}
