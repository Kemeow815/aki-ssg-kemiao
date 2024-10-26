export const connectString = (list: string[] | null) => {
	if (list === null) {
		return "";
	}
	let ret = "";
	list.forEach((val: string) => {
		ret = ret.concat(` ${val}`);
	});
	return ret;
};
