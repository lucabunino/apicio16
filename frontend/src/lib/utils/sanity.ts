import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';

import { createClient } from '@sanity/client';
import groq from 'groq';

import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: false, // `false` if you want to ensure fresh data
	apiVersion: '2024-03-09' // date of setup
});

export async function getHomepage(): Promise<Homepage[]> {
	return await client.fetch(
		groq`*[_type == "homepage"]{
			...,
			} | order(year desc)`
	);
}

export async function getSiteSettings(): Promise<Settings[]> {
	return await client.fetch(
		groq`*[_type == "siteSettings"]{
			...,
			} | order(year desc)`
	);
}

export async function getMenu(): Promise<Settings[]> {
	return await client.fetch(
		groq`*[_type == "menu"] {
			title,
			from,
			to,
			menuContents[] {
				meal,
				mealContent[] {
					course,
					dishes[] {
						dishReference->{
							title,
							description,
							price,
							allergens[]->{
								number,
								title,
								description
							}
						}
					}
				}
			}
		} | order(year desc)`
	);
}





// export interface Work {
// 	thumbnailFeatured: any;
// 	featured: Boolean;
// 	thumbnailHover: any;
// 	thumbnail: any;
// 	_type: 'work';
// 	_createdAt: string;
// 	year: string;
// 	title?: string;
// 	slug: Slug;
// 	excerpt?: string;
// 	mainImage?: ImageAsset;
// 	body: PortableTextBlock[];
// 	media: any;
// 	artDirection: string;
// 	client: any;
// 	service: any;
// 	linkLabel: string;
// 	linkValue: string;
// }