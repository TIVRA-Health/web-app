export const any = (array: any[]) => {
	return array ? array.length > 0 : false;
};

export const diffInMinutesFromNow = (startDate: Date) => {
	const now = new Date();
	const diffMs = now.getTime() - startDate.getTime(); // milliseconds between now & Christmas
	const diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000); // minutes
	return diffMins;
};

export const parseJwt = (token: string) => {
	try {
		return JSON.parse(atob(token.split(".")[1]));
	} catch (e) {
		return null;
	}
};

export const isNumber = (evt: any) => {
	if (!/[0-9]/.test(evt.key)) {
		evt.preventDefault();
	}
};

export const toTitleCase = (str: string) => {
	return str.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

export const makeName = (length = 6) => {
	let result = "Item ";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;

	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}

	return result;
};

export const randomNumber = (min = 1, max = 10) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const groupBy = (list: any[], keyGetter: any) => {
	const map = new Map();

	list.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if (!collection) {
			map.set(key, [item]);
		} else {
			collection.push(item);
		}
	});

	return map;
};

export const onlyUnique = (value: any, index: number, array: any[]) => {
	return array.indexOf(value) === index;
};

export const stringToColor = (string: string) => {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
};

export const stringAvatar = (name: string) => {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
};

export const getFormattedDate = (inputDate: string) => {
	const date = new Date(inputDate);
	const year = date.getFullYear();

	let month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : "0" + month;

	let day = date.getDate().toString();
	day = day.length > 1 ? day : "0" + day;

	return month + "/" + day + "/" + year;
};
