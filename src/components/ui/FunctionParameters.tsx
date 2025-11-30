import type { FC } from "hono/jsx";
import { basePath } from "../../metadata";
import { Translation } from "../../translation/";
import type { Param } from "../../types/model";
import { normalizeDetailBlocks } from "../../utils/normalizeModel";
import { joinPath } from "../../utils/path";
import { ChevronRightIcon } from "../icons";
import { HtmlBlock } from "./HtmlBlock";
import { HtmlInline } from "./HtmlInline";
import { Tooltip } from "./Tooltip";
import { TypeIcon } from "./TypeIcon";
import { buildParamId, type2href } from "./type2href";

type FunctionParametersProps = {
	params: Param[];
	/** Whether these parameter are global attributes */
	globalAttributes?: boolean;
	/**
	 * The prefix for IDs
	 *
	 * See `buildParamId`.
	 */
	prefix?: string | undefined;
};

export const FunctionParameters: FC<FunctionParametersProps> = ({
	params,
	globalAttributes = false,
	prefix = undefined,
}) => {
	const Heading = globalAttributes ? "h3" : "h4";
	return (
		<div class="space-y-6">
			{params.map((param, _index) => (
				<div>
					<Heading id={buildParamId(param.name, prefix)} class="flex">
						<div class="flex flex-wrap items-center gap-2">
							<code class="text-base font-medium">{param.name}</code>
							<div class="flex flex-wrap items-center gap-2 text-sm">
								<div class="flex flex-wrap gap-1 font-normal">
									{param.types.map((t) => {
										const href = type2href(t);
										return (
											<TypeIcon
												key={t}
												type={t}
												href={
													href
														? joinPath(basePath, "reference", href)
														: undefined
												}
											/>
										);
									})}
								</div>

								{param.required && <Tooltip kind="required" />}
								{param.positional && <Tooltip kind="positional" />}
								{param.variadic && <Tooltip kind="variadic" />}
								{param.settable && <Tooltip kind="settable" />}
							</div>
						</div>
					</Heading>

					{normalizeDetailBlocks(param).map((block) => {
						switch (block.kind) {
							case "html":
								return (
									<div class="text-gray-700">
										<HtmlBlock html={block.content} />
									</div>
								);
							case "example":
								return (
									<details class="my-4 folding-example group">
										<summary class="flex items-center gap-1 text-sm font-medium cursor-pointer text-gray-600 hover:text-gray-800 transition-colors marker:hidden">
											<div class="w-4 h-4 text-gray-400 transform transition-transform duration-200 group-open:rotate-90">
												<ChevronRightIcon />
											</div>
											<Translation
												translationKey="showExample"
												title={block.content.title}
											/>
										</summary>
										<div>
											<HtmlBlock html={block.content.body} />
										</div>
									</details>
								);
							default:
								return null;
						}
					})}

					{param.strings.length > 0 && (
						<details
							class="my-4 folding-example group"
							// The list of strings can be very long. For example, `page.paper` has 100+ possibilities.
							open={param.strings.length <= 5}
						>
							<summary class="flex items-center gap-1 text-sm font-medium cursor-pointer text-gray-600 hover:text-gray-800 transition-colors marker:hidden">
								<div class="w-4 h-4 text-gray-400 transform transition-transform duration-200 group-open:rotate-90">
									<ChevronRightIcon />
								</div>
								<Translation translationKey="stringValues" />
							</summary>
							<ul>
								{param.strings.map((string) => (
									<li key={string.string}>
										<div>
											<div>
												<code>{string.string}</code>
											</div>
											<div>
												<HtmlBlock html={string.details} />
											</div>
										</div>
									</li>
								))}
							</ul>
						</details>
					)}

					{param.default && (
						<p>
							<Translation translationKey="defaultValue" />
							<HtmlInline html={param.default} />
						</p>
					)}
				</div>
			))}
		</div>
	);
};
