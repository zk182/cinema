export const parseFormData = async (req, res, next) => {
	const formData = await new Response(req, {
		headers: req.headers
	}).formData();

	req.body = Object.fromEntries(formData.entries());
	next();
};
