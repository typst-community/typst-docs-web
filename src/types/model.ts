// Type definitions for `docs.json`.
// Reference: `docs/src/model.rs` at https://github.com/typst/typst/blame/main/docs/src/model.rs

/**
 * Details about a documentation page and its children.
 */
export type Page = {
	route: string;
	title: string;
	description: string;
	part: string | null;
	outline: OutlineItem[];
	body: Body;
	children: Page[];
};

/**
 * An element in the outline.
 */
export type OutlineItem = {
	id: string;
	name: string;
	children: OutlineItem[];
};

/**
 * Details about the body of a documentation page.
 */
export type Body =
	| HtmlBody
	| CategoryBody
	| FuncBody
	| GroupBody
	| TypeBody
	| SymbolsBody;

export type HtmlBody = {
	kind: "html";
	content: Html;
};

type Html = string;

export type CategoryBody = {
	kind: "category";
	content: {
		name: string;
		title: string;
		details: Html;
		items: CategoryItem[];
		shorthands: Shorthands | null;
	};
};

type CategoryItem = {
	name: string;
	route: string;
	oneliner: string;
	code: boolean;
};

export type FuncBody = {
	kind: "func";
	content: Func;
};

export type Func = {
	path: string[];
	name: string;
	title: string;
	keywords: string[];
	oneliner: string;
	element: boolean;
	contextual: boolean;
	self: boolean;
	params: Param[];
	returns: string[];
	scope: Func[];
} & WithDeprecation &
	WithDetailsBlocks;

type Param = {
	name: string;
	types: string[];
	strings: Str[];
	default: Html | null;
	positional: boolean;
	named: boolean;
	required: boolean;
	variadic: boolean;
	settable: boolean;
} & WithDetailsBlocks;

type DetailsBlock =
	| {
			kind: "html";
			content: Html;
	  }
	| {
			kind: "example";
			content: {
				body: Html;
				title: string | null;
			};
	  };

type WithDetailsBlocks =
	// Format since Typst v0.14.0-rc.1 (typst/typst#7011)
	| { details: DetailsBlock[] }
	// Format for Typst v0.13.1
	| { details: Html; example: Html | null };

type Str = {
	string: string;
	details: Html;
};

export type GroupBody = {
	kind: "group";
	content: {
		name: string;
		title: string;
		details: Html;
		functions: Func[];
		/** Added in Typst v0.14.0-rc.1 (typst/typst#7083) */
		global_attributes?: Param[];
	};
};

export type TypeBody = {
	kind: "type";
	content: {
		name: string;
		title: string;
		keywords: string[];
		oneliner: string;
		details: Html;
		constructor: Func | null;
		scope: Func[];
	};
};

export type SymbolsBody = {
	kind: "symbols";
	content: {
		name: string;
		title: string;
		details: Html;
		list: Symbol[];
	};
};

type Symbol = {
	name: string;
	accent: boolean;
	alternates: string[];
	markup_shorthand: null | string;
	math_shorthand: null | string;
	math_class: null | string;
} & WithSymbolValue &
	WithDeprecation;

type WithSymbolValue =
	// Format since Typst v0.14.0-rc.1 (typst/typst#6489)
	| { value: string }
	// Format for Typst v0.13.1
	| { codepoint: number };

type Shorthands = {
	markup: Symbol[];
	math: Symbol[];
};

type WithDeprecation =
	// Format since Typst v0.14.0-rc.1 (typst/typst#6617)
	| { deprecation_message: string | null; deprecation_until: string | null }
	// Format for Typst v0.13.1
	| { deprecation: string | null };
