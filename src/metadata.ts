import fs from "node:fs";
import path from "node:path";
import type { FC } from "hono/jsx";
import { DiscordIcon, GitHubIcon, HomeIcon, QQIcon } from "./components/icons";

const METADATA_FILE = path.resolve(process.cwd(), "./public/metadata.json");

type Metadata = {
	language: "ja-JP" | "en-US";
	version: string;
	typstOfficialUrl: string;
	typstOfficialDocsUrl: `http://${string}/` | `https://${string}/`;
	githubOrganizationUrl: string;
	social: Social[];
	originUrl: string;
	basePath: "/" | `/${string}/`;
	displayTranslationStatus: boolean;
};
type MetadataInput = Omit<Metadata, "social"> & {
	social: SocialInput[];
};

type Social = {
	url: string;
	title: string;
	Icon: FC<{ title?: string }>;
	kind: "github" | "discord" | "qq" | "homepage";
};
type SocialInput = string | { url: string; title?: string };

const metadata: Metadata = (() => {
	const { social, ...meta }: MetadataInput = (() => {
		if (fs.existsSync(METADATA_FILE)) {
			const content = fs.readFileSync(METADATA_FILE, "utf-8");
			const raw: MetadataInput = JSON.parse(content);

			// Be compatible with old versions of typst-docs-web.
			if (!("social" in raw)) {
				(raw as MetadataInput).social = [];
			}
			if ("githubRepositoryUrl" in raw) {
				raw.social.push(raw.githubRepositoryUrl as string);
			}
			if ("discordServerUrl" in raw) {
				raw.social.push(raw.discordServerUrl as string);
			}

			return raw;
		}
		// If metadata JSON file does not exist, fallback for test environments
		return {
			language: "en-US",
			version: "0.0.0",
			typstOfficialUrl: "https://typst.app/",
			typstOfficialDocsUrl: "https://typst.app/docs/",
			githubOrganizationUrl: "https://github.com/typst",
			social: [
				"https://github.com/typst/typst",
				{
					title: "Discord (dummy)",
					url: "https://discord.gg/dummy",
				},
			],
			originUrl: "https://example.com/",
			basePath: "/docs/",
			displayTranslationStatus: true,
		};
	})();
	return {
		...meta,
		// Normalize social links
		social: social
			.map((s) => (typeof s === "string" ? { url: s } : s))
			.map(({ url, title }) => {
				if (url.startsWith("https://github.com/")) {
					return {
						kind: "github",
						url,
						title:
							title ?? `GitHub (${url.slice("https://github.com/".length)})`,
						Icon: GitHubIcon,
					};
				}
				if (url.startsWith("https://discord.gg/")) {
					return {
						kind: "discord",
						url,
						title: title ?? "Discord",
						Icon: DiscordIcon,
					};
				}
				if (url.startsWith("https://qm.qq.com/")) {
					return {
						kind: "qq",
						url,
						title: title ?? "QQ",
						Icon: QQIcon,
					};
				}
				return {
					kind: "homepage",
					url,
					title: title ?? "Homepage",
					Icon: HomeIcon,
				};
			}),
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
/** Social links. */
export const social = metadata.social;
/** The origin URL of the deployed site, used for metadata. Note that the base path should not be included. */
export const originUrl = metadata.originUrl;
/** The base public path for deployment. This must match the value used in typst-docs. */
export const basePath = metadata.basePath;
/** Indicates whether to display the translation status on the site. Community content is always displayed. */
export const displayTranslationStatus = metadata.displayTranslationStatus;
