import type { FC } from "hono/jsx";
import type { TooltipProps } from "../components/ui/Tooltip";
import { language } from "../metadata";

/**
 * Translation dictionary for UI attributes and aria labels.
 *
 * @example
 * translation.closeMenu()
 * translation.showInformation({ name: "foo" })
 */
export type TranslationObject = {
	htmlLang: () => string;
	documentationTitle: () => string;
	close: () => string;
	closeMenu: () => string;
	closeSearch: () => string;
	openMenu: () => string;
	openSearch: () => string;
	showInformation: (props: { name: string }) => string;
	tooltipKind: (props: { kind: TooltipProps["kind"] }) => string;
};

type TranslationComponentKey =
	// Function tooltips
	| "elementFunction"
	| "elementFunctionDescription"
	| "contextFunction"
	| "contextFunctionDescription"
	// Section tooltips
	| "constructor"
	| "constructorDescription"
	| "definitions" // See also `definitionsOf`
	| "definitionsDescription"
	| "parameters"
	| "parametersDescription"
	// Parameter tooltips
	| "variadic"
	| "variadicDescription"
	| "settable"
	| "settableDescription"
	| "positional"
	| "positionalDescription"
	| "required"
	| "requiredDescription"
	// Other texts in documentation
	// Don't forget `deprecationWarning` and `showExample` declared below.
	| "tutorial"
	| "tutorialDescription"
	| "reference"
	| "referenceDescription"
	| "globalAttributes"
	| "defaultValue"
	| "stringValues"
	// Translation statuses
	| "untranslated"
	| "untranslatedMessage"
	| "communityContent"
	| "contentAddedByCommunity"
	| "partiallyTranslated"
	| "partiallyTranslatedMessage"
	| "translated"
	| "translatedMessage"
	// Header, sidebar, and footer
	| "document"
	| "langVersion"
	| "translationRate"
	| "search"
	| "typstOfficialWebsite"
	| "typstOfficialDocs"
	| "openOfficialDocs"
	| "tableOfContents"
	| "footer"
	| "previousPage"
	| "nextPage"
	// Site notice
	| "siteNoticeBannerTitle"
	| "siteNoticeBannerDescription";

export type TranslationComponentProps =
	| { translationKey: TranslationComponentKey }
	| { translationKey: "definitionsOf"; name: string }
	| {
			translationKey: "deprecationWarning";
			message: string;
			/** A Typst version, e.g. "0.15.0". */
			until: string | null;
	  }
	| { translationKey: "showExample"; title: string | null };

/**
 * Translation component for UI text, descriptions, and other content to be embedded as JSX.
 *
 * @example
 * <Translation translationKey="definitions" />
 */
export type TranslationComponent = FC<TranslationComponentProps>;

// Switch translation language.
const { Translation, translation } = await (() => {
	// These imports should be lazy and static.
	// - Lazy: A translation may use special metadata (e.g., Discord/QQ URL), so not all translations can be safely imported in every build. Therefore, we have to use the import function, not the import statement.
	// - Static: The argument of the import function has to be a plain string, not a variable. Dynamic import has limitations even with rollup and vite properly configured.
	switch (language) {
		case "en-US":
			return import("./en-US");
		case "ja-JP":
			return import("./ja-JP");
		case "zh-Hans":
			return import("./zh-Hans");
		default:
			throw new Error(`Unsupported language: ${language}`);
	}
})();
export { Translation, translation };
