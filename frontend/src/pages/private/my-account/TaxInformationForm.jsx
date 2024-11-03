import { Stack, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TextFieldController } from '@/components/TextFieldController/index.js';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/Button/index.js';
import { ItemTabs } from '@/components/ItemTabs/index.js';
import { TaxPayerType } from '@/config.js';
import {
	useUpdateTaxInformation,
	useCountryOptions
} from '@/pages/private/my-account/hooks/index.js';

export function TaxInformationForm({ onSuccess, SubmitButton, ...props }) {
	const { t } = useTranslation();
	const {
		control,
		onSubmit,
		isSubmitting,
		showCompanyFields,
		hasVAT,
		country
	} = useUpdateTaxInformation({ onSuccess });
	const countries = useCountryOptions();

	return (
		<Stack
			{...props}
			component="form"
			display="inline-flex"
			onSubmit={onSubmit}
		>
			<Controller
				name="type"
				control={control}
				render={({ field }) => {
					return (
						<Stack direction="row" gap={2.5} mb={3}>
							<ItemTabs
								label={t(
									'myAccount.taxInformation.fields.type.company'
								)}
								selected={field.value === TaxPayerType.COMPANY}
								onClick={() => field.onChange(TaxPayerType.COMPANY)}
							/>
							<ItemTabs
								label={t(
									'myAccount.taxInformation.fields.type.private'
								)}
								selected={field.value === TaxPayerType.PRIVATE}
								onClick={() => field.onChange(TaxPayerType.PRIVATE)}
							/>
						</Stack>
					);
				}}
				defaultValue={TaxPayerType.COMPANY}
			/>
			<Stack gap={3}>
				{showCompanyFields && (
					<TextFieldController
						fullWidth
						control={control}
						id="companyName"
						label={t('myAccount.taxInformation.fields.companyName.label')}
						name="companyName"
						placeholder={t(
							'myAccount.taxInformation.fields.companyName.placeholder'
						)}
					/>
				)}
				<TextFieldController
					fullWidth
					control={control}
					select
					id="country"
					label={t('myAccount.taxInformation.fields.country.label')}
					name="country"
					placeholder={t(
						'myAccount.taxInformation.fields.country.placeholder'
					)}
				>
					{countries.map(({ label, value }) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
				</TextFieldController>
				{hasVAT ? (
					<TextFieldController
						fullWidth
						control={control}
						id="vatnumber"
						label={t('myAccount.taxInformation.fields.vatnumber.label')}
						name="vatnumber"
						placeholder={t(
							'myAccount.taxInformation.fields.vatnumber.placeholder'
						)}
					/>
				) : (
					<TextFieldController
						fullWidth
						control={control}
						id="taxId"
						label={
							country === 'es'
								? 'NIF/CIF'
								: t('myAccount.taxInformation.fields.taxId.label')
						}
						name="taxId"
						placeholder={t(
							'myAccount.taxInformation.fields.taxId.placeholder'
						)}
					/>
				)}
				<Stack direction="row" gap={2}>
					<TextFieldController
						fullWidth
						control={control}
						id="firstName"
						label={t('myAccount.taxInformation.fields.firstName.label')}
						name="firstName"
						placeholder={t(
							'myAccount.taxInformation.fields.firstName.placeholder'
						)}
					/>
					<TextFieldController
						fullWidth
						control={control}
						id="lastName"
						label={t('myAccount.taxInformation.fields.lastName.label')}
						name="lastName"
						placeholder={t(
							'myAccount.taxInformation.fields.lastName.placeholder'
						)}
					/>
				</Stack>
				<TextFieldController
					fullWidth
					control={control}
					id="address"
					label={t('myAccount.taxInformation.fields.address.label')}
					name="address"
					placeholder={t(
						'myAccount.taxInformation.fields.address.placeholder'
					)}
				/>
				<Stack direction="row" gap={2}>
					<TextFieldController
						fullWidth
						control={control}
						id="zipCode"
						label={t('myAccount.taxInformation.fields.zipCode.label')}
						name="zipCode"
						placeholder={t(
							'myAccount.taxInformation.fields.zipCode.placeholder'
						)}
					/>
					<TextFieldController
						fullWidth
						control={control}
						id="city"
						label={t('myAccount.taxInformation.fields.city.label')}
						name="city"
						placeholder={t(
							'myAccount.taxInformation.fields.city.placeholder'
						)}
					/>
				</Stack>
				<TextFieldController
					fullWidth
					control={control}
					id="email"
					label={t('myAccount.taxInformation.fields.email.label')}
					name="email"
					placeholder={t(
						'myAccount.taxInformation.fields.email.placeholder'
					)}
				/>
				<Stack direction="row" justifyContent="end">
					{SubmitButton ? (
						<SubmitButton loading={isSubmitting} />
					) : (
						<Button
							type="submit"
							variant="outlined"
							loading={isSubmitting}
						>
							{t('myAccount.taxInformation.submit')}
						</Button>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
}
