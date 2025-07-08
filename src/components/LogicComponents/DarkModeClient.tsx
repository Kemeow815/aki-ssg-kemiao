"use client";

import { darkMode, isDarkMode } from "@/libs/state-management";
import { darkModeAnimation } from "@/utils/darkModeAnimation";
import { useAtom, useAtomValue } from "jotai/react";
import { useCallback, useEffect } from "react";

export function DarkModeClient() {
	const theme = useAtomValue(darkMode);
	const [dark, setDark] = useAtom(isDarkMode);
	useEffect(() => {
		if (dark) {
			document.getElementsByTagName("html").item(0)?.classList.add("dark");
		} else {
			document.getElementsByTagName("html").item(0)?.classList.remove("dark");
		}
	}, [dark]);
	const autoHandler = useCallback(
		(media: MediaQueryList) => {
			if (theme !== "auto") {
				return;
			}
			if (media.matches) {
				setDark(true);
			} else {
				setDark(false);
			}
		},
		[setDark, theme]
	);
	useEffect(() => {
		if (theme === "dark") {
			setDark(true);
			return () => {};
		}
		if (theme === "light") {
			setDark(false);
			return () => {};
		}
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		autoHandler(media);
		const callback = async () => {
			await darkModeAnimation(
				window.innerWidth / 2,
				window.innerHeight / 2,
				() => {
					autoHandler(media);
				}
			);
		};
		media.addEventListener("change", callback, true);
		return () => {
			media.removeEventListener("change", callback, true);
			console.log("Event listener removed");
		};
	}, [autoHandler, setDark, theme]);
	return <></>;
}
