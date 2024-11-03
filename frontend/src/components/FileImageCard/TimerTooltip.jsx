import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function TimerTooltip({ children }) {
	const { t } = useTranslation();

	return (
		<Tooltip
			PopperProps={{
				sx: {
					'.MuiTooltip-tooltip': {
						backgroundColor: '#fff',
						color: 'text.secondary',
						boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.15)',
						p: 2,
						border: '1px solid #E8E8E8',
						borderRadius: 2,
						fontSize: 12,
						lineHeight: '20px',
						whiteSpace: 'pre-wrap'
					}
				}
			}}
			title={t('myImages.timerTooltip')}
		>
			{children}
		</Tooltip>
	);
}
