import PostListPage from "./post-list/[currentPage]/page";

export default function Home() {
	return <PostListPage params={{ currentPage: 1 }} />;
}
