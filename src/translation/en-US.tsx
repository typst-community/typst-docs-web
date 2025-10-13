import { Fragment } from "hono/jsx/jsx-runtime";
import type { TooltipProps } from "../components/ui/Tooltip";
import { githubOrganizationUrl } from "../metadata";
import type { TranslationComponent, TranslationObject } from "./";

export const translation: TranslationObject = {
	htmlLang: () => "en",
	documentationTitle: () => "Typst Documentation (English)",
	close: () => "Close",
	closeMenu: () => "Close menu",
	closeSearch: () => "Close search",
	openMenu: () => "Open menu",
	openSearch: () => "Open search",
	showInformation: (props: { name: string }) =>
		`Show details for ${props.name}`,
	tooltipKind: (props: { kind: TooltipProps["kind"] }) => {
		const map: Record<TooltipProps["kind"], string> = {
			element: "Element",
			contextual: "Contextual",
			constructor: "Constructor",
			definitions: "Definitions",
			parameters: "Parameters",
			variadic: "Variadic",
			settable: "Settable",
			positional: "Positional",
			required: "Required",
		};
		return map[props.kind];
	},
} as const;

export const Translation: TranslationComponent = (props) => {
	switch (props.translationKey) {
		case "search":
			return <Fragment>Search</Fragment>;
		case "defaultValue":
			return <Fragment>Default value:</Fragment>;
		case "stringValues":
			return <Fragment>Available string values</Fragment>;
		case "deprecationWarning":
			return props.until ? (
				<Fragment>
					{props.message}; it will be removed in Typst {props.until}
				</Fragment>
			) : (
				<Fragment>{props.message}</Fragment>
			);
		case "showExample":
			return <Fragment>Show example</Fragment>;
		case "tableOfContents":
			return <Fragment>On this page</Fragment>;
		case "nextPage":
			return <Fragment>Next page</Fragment>;
		case "previousPage":
			return <Fragment>Previous page</Fragment>;
		case "referenceDescription":
			return (
				<Fragment>
					Detailed reference for all Typst syntax, concepts, types, and
					functions.
				</Fragment>
			);
		case "tutorialDescription":
			return <Fragment>Learn how to use Typst step by step.</Fragment>;
		case "tutorial":
			return <Fragment>Tutorial</Fragment>;
		case "openOfficialDocs":
			return <Fragment>Open official docs</Fragment>;
		case "reference":
			return <Fragment>Reference</Fragment>;
		case "typstOfficialDocs":
			return <Fragment>Typst official docs</Fragment>;
		case "typstOfficialWebsite":
			return <Fragment>Typst official website</Fragment>;
		case "untranslated":
			return <Fragment>Untranslated</Fragment>;
		case "untranslatedMessage":
			return (
				<Fragment>
					This page has not been translated yet. The original content is shown.
				</Fragment>
			);
		case "communityContent":
			return <Fragment>Community original content</Fragment>;
		case "contentAddedByCommunity":
			return (
				<Fragment>
					This page contains content that is not part of the official
					documentation, added independently by the community.
				</Fragment>
			);
		case "partiallyTranslated":
			return <Fragment>Partially translated</Fragment>;
		case "partiallyTranslatedMessage":
			return (
				<Fragment>
					This page is partially translated. Some original content is included.
				</Fragment>
			);
		case "translated":
			return <Fragment>Translated</Fragment>;
		case "translatedMessage":
			return <Fragment>This page has been translated into English.</Fragment>;
		case "elementFunction":
			return <Fragment>Element</Fragment>;
		case "elementFunctionDescription":
			return (
				<Fragment>
					Element functions can be customized with <code>set</code> and{" "}
					<code>show</code> rules.
				</Fragment>
			);
		case "contextFunction":
			return <Fragment>Context</Fragment>;
		case "contextFunctionDescription":
			return (
				<Fragment>
					Context functions can only be used when the context is known.
				</Fragment>
			);
		case "constructor":
			return <Fragment>Constructor</Fragment>;
		case "constructorDescription":
			return (
				<Fragment>
					If a type has a constructor, you can call it like a function to create
					a new value of the type.
				</Fragment>
			);
		case "definitionsOf":
			return (
				<Fragment>
					Definitions of <code>{props.name}</code>
				</Fragment>
			);
		case "definitions":
			return <Fragment>Definitions</Fragment>;
		case "definitionsDescription":
			return (
				<Fragment>
					These functions and types can have related definitions. To access a
					definition, specify the name of the function or type, followed by the
					definition name separated by a period.
				</Fragment>
			);
		case "globalAttributes":
			return <Fragment>Global Attributes</Fragment>;
		case "parameters":
			return <Fragment>Parameter</Fragment>;
		case "parametersDescription":
			return (
				<Fragment>
					Parameters are input values for functions. Specify them in parentheses
					after the function name.
				</Fragment>
			);
		case "variadic":
			return <Fragment>Variadic</Fragment>;
		case "variadicDescription":
			return (
				<Fragment>
					Variadic parameters can be specified multiple times.
				</Fragment>
			);
		case "positional":
			return <Fragment>Positional</Fragment>;
		case "positionalDescription":
			return (
				<Fragment>
					Positional parameters can be set by specifying them in order, omitting
					the parameter name.
				</Fragment>
			);
		case "required":
			return <Fragment>Required</Fragment>;
		case "requiredDescription":
			return (
				<Fragment>
					Required parameters must be specified when calling the function.
				</Fragment>
			);
		case "document":
			return <Fragment>Document</Fragment>;
		case "langVersion":
			return <Fragment>English</Fragment>;
		case "translationRate":
			return <Fragment>Translated</Fragment>;
		case "settable":
			return <Fragment>Settable</Fragment>;
		case "settableDescription":
			return (
				<Fragment>
					Settable parameters can be set using the <code>set</code> rule,
					changing the default value used thereafter.
				</Fragment>
			);
		case "siteNoticeBannerTitle":
			return <Fragment>Info</Fragment>;
		case "siteNoticeBannerDescription":
			return (
				<Fragment>
					This site is generated using the static site generator developed by
					the <a href="https://github.com/typst-community">Typst Community</a>.
					Please adjust the text content of this banner according to your usage
					requirements. At Typst GmbH's request, when publishing documentation,
					you must clearly indicate that it is non-official and display the
					version of Typst being documented. For details, refer to{" "}
					<a href="https://github.com/typst/typst/issues/874#issuecomment-2273854138">
						Issue #874 on typst/typst
					</a>
					.
				</Fragment>
			);
		case "footer":
			return (
				<Fragment>
					Translated by <a href={githubOrganizationUrl}>Typst Community</a>
				</Fragment>
			);
		default:
			return null;
	}
};
