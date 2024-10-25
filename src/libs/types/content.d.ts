declare type Content = {
	title: string;
	original_content: string;
	markdown_content: RenderableContent;
};
declare type PageMetadata = {
	slug: string;
	enable_comment: boolean;
	allow_index: boolean;
	navigation_title: string?;
	navigation_index: number;
};
declare type Page = Content & PageMetadata;
declare type PostMetadata = {
	id: number;
	description: string;
	modified_at: Date;
};
declare type Post = PostMetadata & Content;
declare interface RenderableContent {
	toReactNode(): React.ReactNode;
	toToc(): Result;
	toRssFeed(): string;
}
declare type TocItem = {
	display: string;
	id: string;
	level: number;
	child: TocItem[];
	parent?: TocItem;
};
