import { getImageUrl } from '@/utils';

import transactionModel from '@/models/transaction';

export function getImageCardUrl(transaction) {
	const item = transactionModel.getLatestTransformation(transaction);

	if (!item) {
		return null;
	}

	return `${getImageUrl(item.path)}`;
}
