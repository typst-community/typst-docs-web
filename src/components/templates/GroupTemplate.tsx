import type { FC } from "hono/jsx";
import { Translation } from "../../translation/index.js";
import type { GroupBody, Page } from "../../types/model";
import { normalizeGlobalAttributes } from "../../utils/normalizeModel";
import { FunctionDisplay, FunctionParameters, Tooltip } from "../ui";
import { HtmlBlock } from "../ui/HtmlBlock";
import BaseTemplate, { type BaseTemplateProps } from "./BaseTemplate";

export type GroupTemplateProps = Omit<BaseTemplateProps, "page"> & {
	page: Omit<Page, "body"> & {
		body: GroupBody;
	};
};

export const GroupTemplate: FC<GroupTemplateProps> = ({
	page,
	docs,
	path,
	previousPage,
	nextPage,
}) => {
	const content = page.body.content;
	const globalAttributes = normalizeGlobalAttributes(content);

	return (
		<BaseTemplate
			page={page}
			docs={docs}
			path={path}
			previousPage={previousPage}
			nextPage={nextPage}
		>
			<h1 id="summary">{content.title}</h1>
			<HtmlBlock html={content.details} />

			{content.functions.length > 0 && (
				<>
					<h2 id="functions">Function</h2>

					{content.functions.map((method, _index) => (
						<div
							key={method.name}
							class="border-b border-neutral-200 last:border-0"
						>
							<h3 id={`functions-${method.name}`} class="flex">
								<div class="flex items-center gap-2">
									<code class="text-base font-medium">{method.name}</code>
									<div class="flex flex-wrap items-center gap-2 text-sm">
										{method.element && <Tooltip kind="element" />}
										{method.contextual && <Tooltip kind="contextual" />}
									</div>
								</div>
							</h3>
							<FunctionDisplay
								func={method}
								prefix={`functions-${method.name}`}
								isExampleFolding={false}
							/>
						</div>
					))}
				</>
			)}

			{globalAttributes && globalAttributes.length > 0 && (
				<>
					<h2 id="global-attributes">
						<Translation translationKey="globalAttributes" />
					</h2>
					<FunctionParameters
						params={globalAttributes}
						globalAttributes={true}
						prefix="global-attributes"
					/>
				</>
			)}
		</BaseTemplate>
	);
};

export default GroupTemplate;
