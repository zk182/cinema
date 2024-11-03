import { useTranslation } from 'react-i18next';
import {
	Box,
	CircularProgress,
	Dialog,
	DialogContent,
	Hidden,
	Skeleton,
	Stack,
	Typography,
	dialogClasses
} from '@mui/material';
import sofortLogo from '@/images/sofort.svg';
import bancontactLogo from '@/images/bancontact.svg';
import idealLogo from '@/images/ideal.svg';
import { CircleCheckGreen } from '@/components/Icons/CircleCheckGreen';
import { PAYMENT_METHOD_TYPE } from '@/models/stripe';

const logosMap = {
	sofort: sofortLogo,
	ideal: idealLogo,
	bancontact: bancontactLogo
};

function ProcessingModal({ open, text, paymentMethod }) {
	const { t } = useTranslation();

	return (
		<Dialog
			open={open}
			sx={{
				[`.${dialogClasses.paper}`]: {
					maxWidth: 794
				}
			}}
		>
			<DialogContent>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					sx={{
						p: {
							xs: '40px 20px 24px',
							md: '28px 25px 32px 56px'
						},
						width: '100%'
					}}
				>
					<Box
						sx={theme => ({
							pt: 4,

							[theme.breakpoints.down('sm')]: {
								order: 1,
								pb: 10,
								textAlign: 'center'
							},
							[theme.breakpoints.up('md')]: {
								flexGrow: 1,
								pt: 4.5
							}
						})}
					>
						<Hidden smDown>
							<CircleCheckGreen />
						</Hidden>
						<Typography variant="body1">
							{t('checkout.congratulations')}
						</Typography>
						<Typography variant="body2">{text}</Typography>
						<Stack
							direction="row"
							justifyContent={{ xs: 'center', sm: 'flex-start' }}
							sx={{ mt: 6 }}
						>
							<CircularProgress />
						</Stack>
					</Box>
					<Stack
						direction="row"
						justifyContent="center"
						alignItems="center"
						sx={theme => ({
							width: '100%',
							borderRadius: 0,
							backgroundColor:
								paymentMethod === PAYMENT_METHOD_TYPE.SOFORT
									? 'primary.main'
									: 'neutral.200',

							[theme.breakpoints.down('sm')]: {
								height: 240
							},
							[theme.breakpoints.up('md')]: {
								width: 306,
								height: 384
							}
						})}
						paymentMethod={paymentMethod}
					>
						{!paymentMethod ? (
							<Skeleton
								animation="wave"
								variant="rect"
								width="100%"
								height="100%"
								sx={{
									backgroundColor: 'transparent'
								}}
							/>
						) : (
							<>
								<Hidden smDown>
									<img
										src={logosMap[paymentMethod]}
										alt=""
										width="242"
										height="242"
									/>
								</Hidden>
								<Hidden mdUp>
									<img
										src={logosMap[paymentMethod]}
										alt=""
										width="200"
									/>
								</Hidden>
							</>
						)}
					</Stack>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default ProcessingModal;
