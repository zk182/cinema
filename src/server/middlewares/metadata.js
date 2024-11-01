export const kCountry = Symbol('country');
export const kIp = Symbol('ip');

const defaultCountry = 'es';

export const setClientMetadata = (req, res, next) => {
	const countryCode = req.header('cf-ipcountry') || defaultCountry;
	const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	const [clientIp] = ip?.split(',') ?? [];

	req[kCountry] = countryCode.toLowerCase();
	req[kIp] = clientIp;
	res.header('X-Country', countryCode);

	next();
};
