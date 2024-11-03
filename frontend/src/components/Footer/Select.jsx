import { Select as MuiSelect } from '@mui/material';
import { ChevronDownIcon } from '../Icons';

export function Select({ sx, children, ...props }) {
	return (
		<MuiSelect
			displayEmpty
			variant="standard"
			IconComponent={ChevronDownIcon}
			sx={{
				color: 'inherit',
				'.MuiSelect-icon': {
					color: 'inherit'
				},
				':after': {
					display: 'none'
				},
				...sx
			}}
			{...props}
		>
			{children}
		</MuiSelect>
	);
}
