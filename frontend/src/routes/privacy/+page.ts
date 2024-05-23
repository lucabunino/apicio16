// src/routes/+page.js
import { getPrivacyPolicy } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load:any = (async () => {
	const privacyPolicy = await getPrivacyPolicy();
	if (privacyPolicy) {
		return {
			privacyPolicy,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;