import PostListPage from "./post-list/[currentPage]/page";

export default async function Home() {
	return <PostListPage params={Promise.resolve({ currentPage: 1 })} />;
}
