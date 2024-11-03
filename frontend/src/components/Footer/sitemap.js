import { SITE_NAME } from '@/config';
import routes from '@/routes';

export default [
	{
		title: SITE_NAME,
		links: [
			{ labelKey: 'pageTitles.pricing', to: routes.pricing },
			{ labelKey: 'footer.contact', to: routes.contact }
		]
	},
	{
		titleKey: 'footer.company',
		links: [
			{
				labelKey: 'pageTitles.termsAndConditions',
				to: routes.termsAndConditions
			},
			{
				labelKey: 'pageTitles.privacyPolicy',
				to: routes.privacyPolicy
			},
			{
				labelKey: 'pageTitles.cookiesPolicy',
				to: routes.cookiesPolicy
			},
			{
				labelKey: 'pageTitles.faq',
				to: routes.faq
			}
		]
	}
];
