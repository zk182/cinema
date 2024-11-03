import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editImage } from '@/store/editor/thunks';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import routes from '@/routes';
import { Box, Stack, Typography } from '@mui/material';
import { getGridBackgroundStyles, downloadImage, showError } from '@/utils';
import transactionModel from '@/models/transaction';
import { InfoIcon } from '@/components/Icons/InfoIcon';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { DeleteIcon, DownloadIcon, EditIcon } from '../Icons';
import { getImageCardUrl } from './utils';
import { Timer } from './Timer';
import { TimerTooltip } from './TimerTooltip';

const GRID_SIZE = 388;
const LIST_SIZE = 80;

export function FileImageCard({
	view = 'list',
	name,
	transaction,
	onDelete,
	sx
}) {
	const { id, pipeline } = transaction;
	const { t } = useTranslation();
	const [fetchingImage, setFetchingImage] = useState(false);
	const imageUrl = getImageCardUrl(transaction);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const imageStyles = imageUrl
		? {
				backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center'
			}
		: {};

	async function handleDownload() {
		try {
			setFetchingImage(true);
			await downloadImage(
				transactionModel.downloadUrl(id),
				'image-processed.png'
			);
		} catch (error) {
			showError(error);
		} finally {
			setFetchingImage(false);
		}
	}

	const actions = (
		<Stack direction="row" alignItems="center" spacing={1}>
			<IconButton variant="outlined" onClick={onDelete}>
				<DeleteIcon />
			</IconButton>
			<IconButton
				variant="outlined"
				onClick={async () => {
					try {
						await dispatch(editImage(id)).unwrap();
						navigate(routes.editor);
					} catch (error) {
						showError(error);
					}
				}}
			>
				<EditIcon />
			</IconButton>
			<Button
				variant="contained"
				startIcon={<DownloadIcon />}
				disabled={!pipeline?.transformed?.path}
				loading={fetchingImage}
				onClick={handleDownload}
			>
				{t('common.download')}
			</Button>
		</Stack>
	);

	switch (view) {
		case 'grid':
			return (
				<Box
					height={GRID_SIZE}
					width={GRID_SIZE}
					sx={{
						position: 'relative',
						...getGridBackgroundStyles(10)
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							top: 20,
							right: 20,
							zIndex: 2,
							backgroundColor: 'white',
							borderRadius: '4px',
							width: '61px',
							height: '32px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Timer
							tooltip
							createdAt={transaction.createdAt}
							sx={{
								fontSize: 16,
								fontWeight: 700,
								'&:hover': {
									cursor: 'help'
								}
							}}
						/>
					</Box>
					<Box
						borderRadius={2}
						overflow="hidden"
						position="relative"
						height="100%"
						width="100%"
						sx={{
							...sx,
							...imageStyles,
							border: '2px solid transparent',
							'&:hover': {
								borderColor: ({ palette }) => palette.primary.main
							}
						}}
					>
						<Box
							bgcolor="common.white"
							position="absolute"
							bottom={({ spacing }) => spacing(2.5)}
							left="50%"
							p={1}
							borderRadius={3}
							sx={{
								transform: 'translateX(-50%)'
							}}
						>
							{actions}
						</Box>
					</Box>
				</Box>
			);
		case 'list':
		default:
			return (
				<Stack
					alignItems="center"
					direction="row"
					justifyContent="space-between"
					py={2}
					spacing={5}
				>
					<Stack direction="row" alignItems="center" spacing={3}>
						<Box
							height={LIST_SIZE}
							width={LIST_SIZE}
							sx={{
								...getGridBackgroundStyles(5)
							}}
						>
							<Box
								borderRadius={2}
								height="100%"
								width="100%"
								sx={{
									...imageStyles,
									backgroundRepeat: 'no-repeat'
								}}
							/>
						</Box>
						<Box sx={{ display: 'grid', gap: 0.5 }}>
							{name && (
								<Typography variant="body1" fontWeight="semi">
									{name}
								</Typography>
							)}
							<Typography
								variant="body0"
								color="text.secondary"
								fontWeight="medium"
								sx={{
									mt: 0.5
								}}
							>
								{t('common.createdAt', {
									value: dayjs.unix(transaction.createdAt).format('ll')
								})}
							</Typography>
							<Typography
								variant="body0"
								color="text.secondary"
								fontWeight="medium"
								sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
							>
								{t('myImages.timeRemaining')}{' '}
								<Timer
									component="span"
									variant="body0"
									fontWeight="medium"
									createdAt={transaction.createdAt}
								/>
								<TimerTooltip>
									<InfoIcon sx={{ fontSize: 12 }} />
								</TimerTooltip>
							</Typography>
						</Box>
					</Stack>
					{actions}
				</Stack>
			);
	}
}
