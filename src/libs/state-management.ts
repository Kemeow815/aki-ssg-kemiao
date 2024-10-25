import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const darkMode = atomWithStorage<"auto" | "light" | "dark">(
	"dark-mode",
	"auto"
);

export const scrollY = atom(0);
