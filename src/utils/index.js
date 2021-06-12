export const today = () => {
	const date = new Date();
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const period = () => {
	const period = [];
	for (let index = 1; index <= 12; index++) {
		period.push({
			value: "tryTime",
			label: `${index}个月`,
		});
	}
	return period;
};

export const isEmpty = (obj) => {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (!obj[key]) return true;
		}
	}
	return false;
};
