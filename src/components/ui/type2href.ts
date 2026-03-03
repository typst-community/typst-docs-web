import docsJson from "../../../public/docs.json";
import type { Page } from "../../types/model";
import { flattenDocs } from "../../utils/flattenDocs";

const docs = docsJson as unknown as Page[];

const typeHrefMap = (() => {
	const map: Record<string, string> = {};
	const [flat] = flattenDocs(docs);
	for (const page of flat) {
		const { route, body } = page;
		if (!route.startsWith("/docs/reference/")) continue;
		if (body?.kind !== "type") continue;
		const typeName = body.content?.name;
		if (!typeName) continue;
		if (!route.endsWith("/")) continue;
		map[typeName] ||= route;
	}
	return map;
})();

/**
 * Retrieve a link from a type name.
 *
 * @param parameterType The type name.
 * @returns The link.
 */
export const type2href = (parameterType: string): string | undefined => {
	return typeHrefMap[parameterType];
};

/**
 * Build the ID of a parameter with prefix
 *
 * If the parameter belongs to a top-level function on a page, leave `prefix` empty;
 * Otherwise, set it to an appropriate prefix.
 *
 * ## Example values of `prefix`
 *
 * | Page (kind)         | Function         | Parameter  | `prefix`                |
 * | ------------------- | ---------------- | ---------- | ----------------------- |
 * | `figure` (function) | `figure`         | `body`     | `undefined`             |
 * | `figure` (function) | `figure.caption` | `body`     | `"definitions-caption"` |
 * | `calc` (group)      | `calc.abs`       | `value`    | `"functions-abs"`       |
 * | `array` (type)      | `array.at`       | `index`    | `"definitions-at"`      |
 * | `array` (type)      | Constructor      | `value`    | `"constructor"`         |
 * | typed HTML functions (in a group)      | `id`       | `"global-attributes"`   |
 */
export function buildParamId(
	parameterName: string,
	prefix: string | undefined,
): string {
	return prefix === undefined
		? `parameters-${parameterName}`
		: `${prefix}-${parameterName}`;
}
