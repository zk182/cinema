import { useSelector } from 'react-redux';
import { Page } from '@/components/Page';
import { Box, CircularProgress } from '@mui/material';
import { DOMAIN, EMAIL, PHONE, SITE_NAME, SUPPORT_EMAIL } from '@/config';

import { Hero } from './Hero';
import { Container } from './styles';
import { getLink } from './utils';

export function StaticPage({
	metaTitle,
	title,
	description,
	children,
	content,
	legal,
	...rest
}) {
	const legalsReady = useSelector(state => state.auth.legalsReady);

	const websiteLink = getLink(DOMAIN);
	const supportLink = getLink(SUPPORT_EMAIL);

	const formattedContent = content
		.replace(/{websiteLink}/g, websiteLink)
		.replace(/{supportLink}/g, supportLink)
		.replace(/{infoEmail}/g, EMAIL)
		.replace(/{phone}/g, PHONE)
		.replace(/{siteName}/g, SITE_NAME)
		.replace(/{domain}/g, DOMAIN)
		.replace(/{fullSite}/g, window.location.origin);

	if (legal && !legalsReady) {
		return (
			<Page title={title} {...rest}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: '100%',
						minHeight: '50vh'
					}}
				>
					<CircularProgress size={30} />
				</Box>
			</Page>
		);
	}

	return (
		<Page title={metaTitle} {...rest}>
			<Hero title={title} description={description} />
			{content ? (
				<Container
					maxWidth="lg"
					sx={{
						pt: 7,
						pb: 13
					}}
				>
					{/* eslint-disable-next-line */}
					<div dangerouslySetInnerHTML={{ __html: formattedContent }} />
				</Container>
			) : (
				children
			)}
		</Page>
	);
}
