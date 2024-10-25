declare type BlogConfig = {
	hostname: string;
	title: string;
	description: string;
};

declare type DisableComment = { enabled: false };
declare type WalineComment = { enabled: true; waline_api: string };

declare type CommentConfig = DisableComment | WalineComment;

declare type FollowConfig = {
	user_id: number;
	feed_id: number;
};

declare type SiteConfig = {
	blog: BlogConfig;
	comment: CommentConfig;
	gravatar_mirror: string;
	follow?: FollowConfig;
};

declare type PartialSiteConfig = {
	blog?: Partial<BlogConfig>;
	comment?: CommentConfig;
	gravatar_mirror?: string;
	follow?: FollowConfig;
};
