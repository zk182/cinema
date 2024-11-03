export function getLink(href, text) {
	return `<a href="${href}">${text || href}</a>`;
}
