export const connectString = (list: string[] | null) => {
	return list?.join(" ") ?? "";
};
