import { palette } from '@/theme/palette';
import { typography } from '@/theme/typography';
import { Container as ContainerBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(ContainerBase)`
	p,
	ul {
		margin: 0;
		margin-top: 12px;
	}

	p,
	li {
		${typography.body1}
		color: ${palette.text.secondary};
	}

	.no-bullets-list {
		list-style-type: none;
		padding-inline-start: 0;

		li {
			list-style: none;
		}
	}

	h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;
		margin-top: 20px;
	}

	h4 {
		margin: 0;
		color: #656565;
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;
		margin-top: 20px;
	}
`;
