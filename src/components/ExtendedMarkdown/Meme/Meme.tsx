import { config } from "@/data/site-config";
import Image from "../../PostComponents/Image";

export default async function Meme({
	group,
	mid,
}: {
	group: string;
	mid: string;
}) {
	if (config.optimize.meme_base_url === undefined) {
		return (
			<span style={{ display: "inline-block", color: "rgb(239 68 68)" }}>
				[Meme: {group}/{mid}]
			</span>
		);
	}
	return (
		<Image
			src={`${config.optimize.meme_base_url}${group}/${mid}`}
			alt={`Meme: ${group}/${mid}`}
			inline
			scale={0.2}
		/>
	);
}
