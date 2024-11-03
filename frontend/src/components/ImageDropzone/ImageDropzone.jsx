import { useDropzone } from 'react-dropzone';
import { Stack, Typography, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card';
import { ButtonUploadImage } from '../ButtonUploadImage';

/**
 * @param {object} props
 * @param {import('react-dropzone').DropzoneOptions} props.dropzoneProps
 */
export function ImageDropzone({ dropzoneProps, sx, variant, ...props }) {
	const { t } = useTranslation();

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxFiles: 1,
		accept: {
			'image/*': []
		},
		...dropzoneProps
	});

	return (
		<Card
			variant={variant}
			{...props}
			{...getRootProps()}
			sx={{
				cursor: 'pointer',
				py: 4.75,
				px: 2,
				borderRadius: '10px',
				background: 'rgba(255, 255, 255, 0.50)',
				boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.15)',
				transitionProperty: 'background',
				...sx,
				...(isDragActive && {
					bgcolor: ({ palette }) => alpha(palette.divider, 0.5),
					opacity: 0.75
				}),
				'&:hover': {
					bgcolor: 'rgba(255, 255, 255, 0.75)'
				}
			}}
		>
			<input {...getInputProps()} />

			<Stack
				height="100%"
				alignItems="center"
				justifyContent="center"
				spacing={2}
				textAlign="center"
			>
				<ButtonUploadImage />

				<Stack spacing={1}>
					<Typography
						color="text.primary"
						fontWeight="semi"
						variant="body2"
					>
						{t('dropzone.instructions')}
					</Typography>
					<Typography color="text.secondary">(1000 x 1000px)</Typography>
				</Stack>
			</Stack>
		</Card>
	);
}
