import { useMedia } from '@/hooks/responsive';
import { Box, Stack, Typography } from '@mui/material';

export function PageLayout({ title, children }) {
	const mdDown = useMedia('mdDown');
	return (
		<Box>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<Typography
					variant="h1"
					sx={{
						...(mdDown && {
							fontSize: 28
						})
					}}
				>
					{title}
				</Typography>
			</Stack>

			<Box mt={2}>{children}</Box>
		</Box>
	);
}
