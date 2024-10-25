/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export const throttle = (fn: Function, time: number) => {
	let timer: NodeJS.Timeout | null = null;
	return (...args: any) => {
		if (!timer) {
			fn.apply(this, args);
			timer = setTimeout(() => {
				timer = null;
			}, time);
		}
	};
};
