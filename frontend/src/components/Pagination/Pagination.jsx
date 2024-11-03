import { Pagination as MuiPagination, PaginationItem } from '@mui/material';
import { ChevronLeftSmallIcon, ChevronRightSmallIcon } from '../Icons';

function PreviousIcon({ sx, props }) {
	return (
		<ChevronLeftSmallIcon
			sx={{ ...sx, '&.MuiSvgIcon-root': { fontSize: 8 } }}
			{...props}
		/>
	);
}

function NextIcon({ sx, ...props }) {
	return (
		<ChevronRightSmallIcon
			sx={{ ...sx, '&.MuiSvgIcon-root': { fontSize: 8 } }}
			{...props}
		/>
	);
}

export function Pagination(props) {
	return (
		<MuiPagination
			renderItem={item => (
				<PaginationItem
					slots={{ previous: PreviousIcon, next: NextIcon }}
					{...item}
				/>
			)}
			{...props}
		/>
	);
}
