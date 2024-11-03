export function CfCaptchaWidget({ style, ...props }) {
	return (
		<div
			id="cf-turnstile-widget"
			style={{ marginTop: 20, textAlign: 'center', minHeight: 35, ...style }}
			{...props}
		/>
	);
}
