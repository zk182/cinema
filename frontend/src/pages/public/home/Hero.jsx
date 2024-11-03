import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useMedia } from '@/hooks/responsive';

import bgColorsImage from '@/images/bg_colors.webp';
import bgPatternImage from '@/images/bg_pattern.webp';

export function Hero() {
	const { t } = useTranslation();

	const mdDown = useMedia('mdDown');

	return (
		<Box
			component="section"
			bgcolor="#F1F0EE"
			py={{
				xs: 6,
				md: 12
			}}
			sx={{
				backgroundImage: `url('${bgColorsImage}')`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				position: 'relative'
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundImage: `url('${bgPatternImage}')`,
					backgroundPosition: 'bottom',
					backgroundRepeat: 'repeat-x'
				}}
			/>
			<Container maxWidth="lg" sx={{ position: 'relative' }}>
				<Box textAlign="center" mx="auto">
					<Typography
						variant={mdDown ? 'h2' : 'lead'}
						fontSize={mdDown ? 28 : 62}
						fontWeight="bold"
						sx={{ mb: 1 }}
					>
						{t('home.hero.title')}
					</Typography>
					<Typography
						variant={mdDown ? 'body2' : 'body3'}
						color="text.secondary"
					>
						{t('home.hero.subheading')}
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
