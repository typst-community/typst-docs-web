import type { FC } from "hono/jsx";
import { twMerge } from "tailwind-merge";
import { socialLinks } from "../../../metadata";
import { DiscordIcon, GitHubIcon, LinkIcon, QQIcon } from "../../icons";

export const SocialLinkIcons: FC<{ size: "sm" | "md" }> = ({ size }) => {
	return (
		<div
			class={twMerge("flex items-center", size === "sm" ? "gap-3" : "gap-4")}
		>
			{socialLinks
				.map(({ url, title }) => {
					if (url.startsWith("https://github.com/")) {
						return {
							url,
							title:
								title ?? `GitHub (${url.slice("https://github.com/".length)})`,
							Icon: GitHubIcon,
						};
					}
					if (url.startsWith("https://discord.gg/")) {
						return {
							url,
							title: title ?? "Discord",
							Icon: DiscordIcon,
						};
					}
					if (url.startsWith("https://qm.qq.com/")) {
						return {
							url,
							title: title ?? "QQ",
							Icon: QQIcon,
						};
					}
					return {
						url,
						title: title ?? "Homepage",
						Icon: LinkIcon,
					};
				})
				.map(({ url, title, Icon }) => (
					<div key={url}>
						<a
							href={url}
							title={title}
							class="text-gray-600 hover:text-gray-800 transition-colors"
						>
							<span class="sr-only">{title}</span>
							<div class={size === "sm" ? "size-4" : "size-6"}>
								<Icon />
							</div>
						</a>
					</div>
				))}
		</div>
	);
};
