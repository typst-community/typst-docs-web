import type { FC } from "hono/jsx";
import { basePath } from "../../metadata";
import { Translation } from "../../translation/";
import type { Func } from "../../types/model";
import { normalizeDetailBlocks } from "../../utils/normalizeModel";
import { joinPath } from "../../utils/path";
import { ChevronRightIcon } from "../icons";
import { HtmlContent } from "./HtmlContent";
import { Tooltip } from "./Tooltip";
import { TypeIcon } from "./TypeIcon";
import { buildParamId, type2href } from "./type2href";

type FunctionParametersProps = {
	func: Func;
	/**
	 * The prefix for IDs
	 *
	 * See `buildParamId`.
	 */
	prefix?: string | undefined;
};

export const FunctionParameters: FC<FunctionParametersProps> = ({
	func,
	prefix = undefined,
}) => {
	return (
		<div class="space-y-6">
			{func.params.map((param, _index) => (
				<div
					key={param.name}
					class="bg-gray-50 rounded-md p-4 border border-gray-100"
				>
					<h4
						id={buildParamId(param.name, prefix)}
						class="flex flex-wrap items-center gap-2 mb-3"
					>
						<code class="text-base font-medium">{param.name}</code>
						<div class="flex flex-wrap items-center gap-2 text-sm">
							<div class="flex flex-wrap gap-1">
								{param.types.map((t) => {
									const href = type2href(t);
									return (
										<TypeIcon
											key={t}
											type={t}
											href={
												href ? joinPath(basePath, "reference", href) : undefined
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
					</h4>

					{normalizeDetailBlocks(param).map((block) => {
						switch (block.kind) {
							case "html":
								return (
									<div class="text-gray-700">
										<HtmlContent html={block.content} />
									</div>
								);
							case "example":
								return (
									<details class="folding-example group">
										<summary class="flex items-center gap-1 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800">
											<div class="w-4 h-4 text-gray-400 transform transition-transform duration-200 group-open:rotate-90">
												<ChevronRightIcon />
											</div>
											<Translation
												translationKey="showExample"
												title={block.content.title}
											/>
										</summary>
										<div class="mt-2 bg-white p-3 rounded-md border border-gray-200 text-sm">
											<HtmlContent html={block.content.body} />
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
							<summary class="flex items-center gap-1 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800">
								<div class="w-4 h-4 text-gray-400 transform transition-transform duration-200 group-open:rotate-90">
									<ChevronRightIcon />
								</div>
								<Translation translationKey="stringValues" />
							</summary>
							<ul class="type-args space-y-2">
								{param.strings.map((string) => (
									<li key={string.string}>
										<div class="break-box">
											<div class="mb-1">
												<code class="text-gray-800">{string.string}</code>
											</div>
											<div class="text-sm text-gray-700">
												<HtmlContent html={string.details} />
											</div>
										</div>
									</li>
								))}
							</ul>
						</details>
					)}

					{param.default && (
						<p class="mt-5 text-sm">
							<span class="font-medium">
								<Translation translationKey="defaultValue" />
							</span>{" "}
							<span class="text-gray-700">
								<HtmlContent html={param.default} />
							</span>
						</p>
					)}
				</div>
			))}
		</div>
	);
};
