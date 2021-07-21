export function today() {
	const date = new Date()
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function period() {
	const period = []
	for (let index = 1; index <= 12; index++) {
		period.push({
			value: "tryTime",
			label: `${index}个月`,
		})
	}
	return period
}

export function payday() {
	const period = []
	for (let index = 1; index <= 31; index++) {
		period.push({
			value: "payDay",
			label: `${index}`,
		})
	}
	return period
}

export function isObject(obj) {
	return Object.prototype.toString.call(obj) === "[object Object]"
}

export function isEmpty(obj) {
	if (isObject(obj)) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (!obj[key]) return true
			}
		}
		return false
	}
}
