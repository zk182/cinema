import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';

const linearGradient =
	'linear-gradient(90deg, #9747FF 0%, #F372C2 51%, #DFF265 100%)';

export function ButtonUploadImage(props) {
	const { t } = useTranslation();

	return (
		<Box
			sx={{
				background: linearGradient,
				borderRadius: 4,
				display: 'inline-flex',
				p: 0.5
			}}
		>
			<Button
				{...props}
				variant="contained"
				color="secondary"
				size="large"
				sx={theme => ({
					py: 1.5,
					px: 4,

					'&:hover': {
						background: linearGradient,
						color: theme.palette.secondary.main
					}
				})}
			>
				{t('dropzone.cta')}
			</Button>
		</Box>
	);
}
