export function scrollIntoViewById(id: string) {
	document.getElementById(id)!.scrollIntoView({
		block: "center",
		behavior: "smooth",
	});
}
