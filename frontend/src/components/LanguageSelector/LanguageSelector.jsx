import { useEffect, useState } from 'react';
import { MenuItem, Select as MuiSelect } from '@mui/material';
import { useLanguage } from '@/hooks';
import { useLanguageOptions } from './hooks';

export function LanguageSelector({
	value: valueProp,
	onChange,
	SelectComponent = MuiSelect,
	...props
}) {
	const language = useLanguage();
	const [value, setValue] = useState(language);

	const options = useLanguageOptions();

	useEffect(() => {
		onChange?.(value);
	}, [value]);

	return (
		<SelectComponent
			value={valueProp || value}
			onChange={event => setValue(event.target.value)}
			{...props}
		>
			{options.map(({ label, value: optionValue }) => (
				<MenuItem key={optionValue} value={optionValue}>
					{label}
				</MenuItem>
			))}
		</SelectComponent>
	);
}
