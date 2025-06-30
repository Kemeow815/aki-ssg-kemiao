/* eslint-disable @next/next/no-img-element */
"use client";
import getAvatar from "@/utils/getAvatar";
import Link from "next/link";
import { useAtom, useAtomValue } from "jotai";
import { darkMode, scrollY } from "@/libs/state-management";
import {
	createContext,
	startTransition,
	useCallback,
	useContext,
	useEffect,
	useState,
	useTransition,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleHalfStroke,
	faMoon,
	faSun,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "@/data/site-config";
import "@/styles/navigation.css";

function getDarkModeAlt(mode: "auto" | "light" | "dark") {
	switch (mode) {
		case "auto":
			return "跟随系统";
		case "light":
			return "默认浅色";
		case "dark":
			return "默认深色";
	}
}

function getDarkModeIcon(mode: "auto" | "light" | "dark") {
	switch (mode) {
		case "auto":
			return faCircleHalfStroke;
		case "light":
			return faSun;
		case "dark":
			return faMoon;
	}
}

function DarkModeSwitcher() {
	const [theme, setTheme] = useAtom(darkMode);
	const handler = useCallback(() => {
		startTransition(() => {
			switch (theme) {
				case "auto":
					setTheme("light");
					break;
				case "light":
					setTheme("dark");
					break;
				case "dark":
					setTheme("auto");
					break;
			}
		});
	}, [theme, setTheme]);
	return (
		<button
			id="dark-mode-switcher"
			onClick={handler}
			title={`切换深色模式状态（当前：${getDarkModeAlt(theme)}）`}>
			<FontAwesomeIcon icon={getDarkModeIcon(theme)} />
		</button>
	);
}

const toggleExpandContext = createContext<() => void>(() => {});

function NavigationItem({ link }: { link: { title: string; url: string } }) {
	const toggleExpand = useContext(toggleExpandContext);
	return (
		<li className="navigation-item" key={link.title}>
			<Link
				className="navigation-link"
				onClick={() => {
					toggleExpand();
				}}
				href={link.url}>
				{link.title}
			</Link>
		</li>
	);
}

export default function Navigation({
	links,
}: {
	links: { title: string; url: string }[];
}) {
	const scroll = useAtomValue(scrollY);
	const [expanded, setExpanded] = useState(false);
	const [navHeight, setNavHeight] = useState(5);
	const [navWidth, setNavWidth] = useState(5);
	const [menuStep, setMenuStep] = useState<1 | 2 | 3>(1);
	const [, startTransistion] = useTransition();
	useEffect(() => {
		setNavWidth(Math.min(42, 5 * (links.length + 1) + 10));
	}, [links]);
	const toggleExpand = useCallback(() => {
		setExpanded(!expanded);
		if (!expanded) {
			setNavHeight(5 + 3.5 * (links.length + 1) + 0.25);
			startTransistion(() => {
				setMenuStep(2);
			});
			setTimeout(() => {
				startTransistion(() => {
					setMenuStep(3);
				});
			}, 200);
		} else {
			setNavHeight(5);
			startTransistion(() => {
				setMenuStep(2);
			});
			setTimeout(() => {
				startTransistion(() => {
					setMenuStep(1);
				});
			}, 200);
		}
	}, [setExpanded, setNavHeight, expanded, links]);
	return (
		<toggleExpandContext.Provider
			value={() => {
				toggleExpand();
			}}>
			<nav
				style={
					{
						"--nav-height": `${navHeight}rem`,
						"--nav-width": `${navWidth}rem`,
					} as React.CSSProperties
				}>
				<div id="navigation-wrap" className={scroll > 500 ? "wide" : ""}>
					<div id="navigation-bar">
						<Link href="/">
							<img
								src={getAvatar(config.author.email, 80)}
								width={60}
								height={60}
								alt="Avatar"
								style={{ borderRadius: "9999px" }}
							/>
						</Link>
						<ul id="pc-navigation">
							<li>
								<Link href="/">首页</Link>
							</li>
							{links.map((ln) => {
								return (
									<li key={ln.title}>
										<Link href={ln.url}>{ln.title}</Link>
									</li>
								);
							})}
						</ul>
						<div id="navigation-tools">
							<DarkModeSwitcher />
							<button
								id="mobile-navigation-toggle"
								// className="w-12 h-12 md:hidden flex items-center justify-center rounded-full md:-ms-3 transition-colors bg-white bg-opacity-0 active:bg-opacity-10"
								onClick={() => {
									toggleExpand();
								}}>
								<span id="mobile-navigation-toggle-icon" aria-hidden="true">
									<span
										className={`mobile-navigation-toggle-bar mobile-navigation-toggle-bar-1 step-${menuStep}`}
									/>
									<span
										className={`mobile-navigation-toggle-bar mobile-navigation-toggle-bar-2 step-${menuStep}`}
									/>
									<span
										className={`mobile-navigation-toggle-bar mobile-navigation-toggle-bar-3 step-${menuStep}`}
									/>
								</span>
							</button>
						</div>
					</div>
					<hr
						id="mobile-navigation-divider"
						style={{
							display: expanded ? undefined : "none",
							borderColor: expanded ? undefined : "transparent",
						}}
					/>
					<ul
						id="mobile-navigation"
						style={{ display: expanded ? undefined : "none" }}>
						<NavigationItem link={{ title: "首页", url: "/" }} />
						{links.map((ln) => {
							return <NavigationItem link={ln} key={ln.title} />;
						})}
					</ul>
				</div>
			</nav>
		</toggleExpandContext.Provider>
	);
}
