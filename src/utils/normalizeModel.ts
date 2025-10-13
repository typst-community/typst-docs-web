/**
 * Normalize models to the latest format.
 * @module
 */

import type {
	DetailsBlock,
	WithDeprecation,
	WithDetailsBlocks,
} from "../types/model";

/**
 * Return deprecation info if deprecated, return null otherwise.
 */
export function normalizeDeprecation(item: WithDeprecation): {
	message: string;
	until: string | null;
} | null {
	if ("deprecation" in item) {
		// For v0.13.1
		return item.deprecation ? { message: item.deprecation, until: null } : null;
	}

	if (item.deprecation_message) {
		return { message: item.deprecation_message, until: item.deprecation_until };
	}
	if (item.deprecation_until) {
		// This will never reach for Typst v0.14.0-rc.1 documentation.
		return { message: item.deprecation_until, until: null };
	}
	return null;
}

export function normalizeDetailBlocks(item: WithDetailsBlocks): DetailsBlock[] {
	if ("example" in item) {
		// For v0.13.1
		const details: DetailsBlock[] = [
			{
				kind: "html",
				content: item.details,
			},
		];

		if (item.example !== null) {
			details.push({
				kind: "example",
				content: {
					title: null,
					body: item.example,
				},
			});
		}

		return details;
	}

	return item.details;
}
