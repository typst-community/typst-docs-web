import type { FC } from "hono/jsx";
import { Translation } from "../../translation/";
import type { Func } from "../../types/model";
import { normalizeDetailBlocks } from "../../utils/normalizeModel.js";
import { ChevronRightIcon } from "../icons";
import { FunctionDefinition } from "./FunctionDefinition";
import { FunctionParameters } from "./FunctionParameters";
import { HtmlContent } from "./HtmlContent";

type FunctionDisplayProps = {
	func: Func;
	/**
	 * The prefix for IDs of function parameters
	 *
	 * See `buildParamId`.
	 */
	prefix?: string | undefined;
	isExampleFolding?: boolean;
};

export const FunctionDisplay: FC<FunctionDisplayProps> = ({
	func,
	prefix = undefined,
	isExampleFolding = true,
}) => {
	return (
		<>
			{normalizeDetailBlocks(func).map((block) => {
				switch (block.kind) {
					case "html":
						return <HtmlContent html={block.content} />;
					case "example":
						return isExampleFolding ? (
							<details class="folding-example group">
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
									<HtmlContent html={block.content.body} />
								</div>
							</details>
						) : (
							<HtmlContent html={block.content.body} />
						);
					default:
						return null;
				}
			})}
			<FunctionDefinition func={func} prefix={prefix} />
			<FunctionParameters params={func.params} prefix={prefix} />
		</>
	);
};
