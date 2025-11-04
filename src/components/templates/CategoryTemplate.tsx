import type { FC } from "hono/jsx";
import { Translation } from "../../translation/";
import type { CategoryBody, Page } from "../../types/model";
import { HtmlContent } from "../ui/HtmlContent";
import BaseTemplate, { type BaseTemplateProps } from "./BaseTemplate";

export type CategoryTemplateProps = Omit<BaseTemplateProps, "page"> & {
	page: Omit<Page, "body"> & {
		body: CategoryBody;
	};
};

export const CategoryTemplate: FC<CategoryTemplateProps> = ({
	page,
	docs,
	path,
	previousPage,
	nextPage,
}) => {
	return (
		<BaseTemplate
			page={page}
			docs={docs}
			path={path}
			previousPage={previousPage}
			nextPage={nextPage}
		>
			<h1 id="summary">{page.body.content.title}</h1>
			<HtmlContent html={page.body.content.details} />
			{page.body.content.items.length > 0 && (
				<>
					<h2 id="definitions">
						<Translation translationKey="definitions" />
					</h2>
					<ul>
						{page.body.content.items.map((item) => (
							<li key={item.route}>
								<div class="flex">
									<div class="min-w-[8rem]">
										<a href={item.route}>
											{item.code ? <code>{item.name}</code> : item.name}
										</a>
									</div>
									<div>{item.oneliner}</div>
								</div>
							</li>
						))}
					</ul>
				</>
			)}
		</BaseTemplate>
	);
};
