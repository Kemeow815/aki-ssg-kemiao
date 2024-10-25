"use client";

import { scrollY } from "@/libs/state-management";
import { throttle } from "@/utils/throttle";
import { useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

export function ScrollClient() {
	const setScrollY = useSetAtom(scrollY);
	const handler = useCallback(
		throttle(() => {
			setScrollY(
				document.body.scrollTop || document.documentElement.scrollTop || 0
			);
		}, 100),
		[setScrollY]
	);
	useEffect(() => {
		setScrollY(
			document.body.scrollTop || document.documentElement.scrollTop || 0
		);
		document.addEventListener("scroll", handler, true);
		return () => {
			document.removeEventListener("scroll", handler);
		};
	}, [handler, setScrollY]);
	return <></>;
}
