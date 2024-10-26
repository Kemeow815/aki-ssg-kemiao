"use client";

import dynamic from "next/dynamic";

export const NeteaseMusicClient = dynamic(
	() => import("@/components/ExtendedMarkdown/NeteaseMusicClientInner"),
	{ ssr: false }
);
