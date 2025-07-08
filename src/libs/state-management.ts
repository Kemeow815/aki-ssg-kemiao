import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isProd = process.env.NODE_ENV === "production";

export const darkMode = atomWithStorage<"auto" | "light" | "dark">(
	"dark-mode",
	"auto"
);

export const isDarkMode = atom(false);

export const scrollY = atom(0);
