import fs from "node:fs";
import path from "node:path";

const METADATA_FILE = path.resolve(process.cwd(), "./public/metadata.json");

type Metadata = {
	language: "ja-JP" | "en-US";
	version: string;
	typstOfficialUrl: string;
	typstOfficialDocsUrl: `http://${string}/` | `https://${string}/`;
	githubOrganizationUrl: string;
	/** @deprecated Use `socialLinks` instead. */
	githubRepositoryUrl?: string;
	/** @deprecated Use `socialLinks` instead. */
	discordServerUrl?: string;
	socialLinks: { url: string; title?: string }[];
	originUrl: string;
	basePath: "/" | `/${string}/`;
	displayTranslationStatus: boolean;
};

const metadata: Metadata = (() => {
	if (fs.existsSync(METADATA_FILE)) {
		const jsonBody = fs.readFileSync(METADATA_FILE, "utf-8");
		const parsedMetadata: Metadata = JSON.parse(jsonBody);

		// TODO: Remove deprecated fields in future major update.
		if ("githubRepositoryUrl" in parsedMetadata) {
			throw new Error(
				"`githubRepositoryUrl` is deprecated. Please use `socialLinks` instead.",
			);
		}
		if ("discordServerUrl" in parsedMetadata) {
			throw new Error(
				"`discordServerUrl` is deprecated. Please use `socialLinks` instead.",
			);
		}

		return parsedMetadata;
	}

	// If metadata JSON file does not exist, fallback for test environments
	return {
		language: "en-US",
		version: "0.0.0",
		typstOfficialUrl: "https://typst.app/",
		typstOfficialDocsUrl: "https://typst.app/docs/",
		githubOrganizationUrl: "https://github.com/typst",
		socialLinks: [
			{ url: "https://github.com/typst/typst" },
			{
				title: "Discord (dummy)",
				url: "https://discord.gg/dummy",
			},
		],
		originUrl: "https://example.com/",
		basePath: "/docs/",
		displayTranslationStatus: true,
	} satisfies Metadata;
})();

/** The language of the documentation. */
export const language = metadata.language;
/** The version of the documentation, without a leading `v`. */
export const version = metadata.version;
/** The official Typst website URL. */
export const typstOfficialUrl = metadata.typstOfficialUrl;
/** The official Typst documentation base URL. */
export const typstOfficialDocsUrl = metadata.typstOfficialDocsUrl;
/** The GitHub organization URL. */
export const githubOrganizationUrl = metadata.githubOrganizationUrl;
/** The social links to be displayed in the site header and footer. */
export const socialLinks = metadata.socialLinks;
/** The origin URL of the deployed site, used for metadata. Note that the base path should not be included. */
export const originUrl = metadata.originUrl;
/** The base public path for deployment. This must match the value used in typst-docs. */
export const basePath = metadata.basePath;
/** Indicates whether to display the translation status on the site. Community content is always displayed. */
export const displayTranslationStatus = metadata.displayTranslationStatus;
