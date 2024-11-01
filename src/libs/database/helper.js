export function toCamelCase(string) {
	return string.replace(/_([a-z])/g, letter => letter[1].toUpperCase());
}

export function toSnakeCase(string) {
	return string.replace(
		/[A-Z]/g,
		(match, index) => (index !== 0 ? '_' : '') + match.toLowerCase()
	);
}

export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomItem(servers) {
	return servers[getRandomInt(0, servers.length)];
}

export function convertFieldsToCamel(item) {
	if (typeof item !== 'object') {
		return item;
	}

	const result = {};

	for (const [key, value] of Object.entries(item)) {
		const camelCaseKey = toCamelCase(key);

		result[camelCaseKey] = value;
	}

	return result;
}
