"use client";
import { scrollY } from "@/libs/state-management";
import { useAtomValue } from "jotai";
import style from "./style.module.css";

function Icon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="currentColor"
			viewBox="0 0 512 512">
			<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
		</svg>
	);
}

export default function GoToTop() {
	const scroll = useAtomValue(scrollY);
	return (
		<button
			title="Go to Top"
			style={{
				opacity: scroll <= 500 ? 0 : undefined,
				visibility: scroll <= 500 ? "hidden" : undefined,
			}}
			className={style.top}
			disabled={scroll <= 500}
			onClick={() => {
				window.scrollTo({
					left: 0,
					top: 0,
					behavior: "smooth",
				});
			}}>
			<Icon />
		</button>
	);
}
