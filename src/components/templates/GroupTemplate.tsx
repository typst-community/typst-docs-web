import type { FC } from "hono/jsx";
import { Translation } from "../../translation/index.js";
import type { GroupBody, Page } from "../../types/model";
import { FunctionDisplay, FunctionParameters, Tooltip } from "../ui";
import { HtmlContent } from "../ui/HtmlContent";
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

	return (
		<BaseTemplate
			page={page}
			docs={docs}
			path={path}
			previousPage={previousPage}
			nextPage={nextPage}
		>
			<h1 id="summary">{content.title}</h1>
			<HtmlContent html={content.details} />

			{content.functions.length > 0 && (
				<>
					<h2 id="functions">Function</h2>

					{content.functions.map((method, _index) => (
						<div key={method.name}>
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

			{content.global_attributes && content.global_attributes.length > 0 && (
				<>
					<h2 id="global-attributes">
						<Translation translationKey="globalAttributes" />
					</h2>
					<FunctionParameters
						params={content.global_attributes}
						globalAttributes={true}
						prefix="global-attributes"
					/>
				</>
			)}
		</BaseTemplate>
	);
};

export default GroupTemplate;
