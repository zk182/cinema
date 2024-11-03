import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box
} from '@mui/material';
import { Button } from '../Button';

export default {
	title: 'Components/Accordion',
	component: Accordion,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		backgroundColor: {
			control: 'color'
		}
	},
	render: () => (
		<Box>
			<Accordion>
				<AccordionSummary aria-controls="panel1-content" id="panel1-header">
					Accordion 1
				</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
					eget.
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary aria-controls="panel2-content" id="panel2-header">
					Accordion 2
				</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
					eget.
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary aria-controls="panel3-content" id="panel3-header">
					Accordion Actions
				</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
					eget.
				</AccordionDetails>
				<AccordionActions>
					<Button>Cancel</Button>
					<Button>Agree</Button>
				</AccordionActions>
			</Accordion>
		</Box>
	)
};

export const Default = {
	args: {}
};
