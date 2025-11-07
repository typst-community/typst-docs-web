import type { FC } from "hono/jsx";
import { basePath } from "../../metadata";
import type { Func } from "../../types/model";
import { joinPath } from "../../utils/path";
import { TypeIcon } from "./TypeIcon";
import { buildParamId, type2href } from "./type2href";

/**
 * Returns the decorated function name with `.typ-func` and `.typ-punct` spans.
 *
 * For Typst v0.14.0, the path is either empty or has only one item.
 */
const DecoratedFuncName: FC<{ func: Func }> = ({ func }) => {
	const funcName = func.self ? "self" : func.path.join(".");
	return (
		<>
			<span>{funcName}</span>
			{funcName !== "" && <span class="typ-punct">.</span>}
			<span class="typ-func">{func.name}</span>
		</>
	);
};

type FunctionDefinitionProps = {
	func: Func;
	/**
	 * The prefix for parameter IDs
	 *
	 * See `buildParamId`.
	 */
	prefix?: string | undefined;
};

export const FunctionDefinition: FC<FunctionDefinitionProps> = ({
	func,
	prefix = undefined,
}) => {
	return (
		<pre>
			<code>
				<DecoratedFuncName func={func} />
				<span class="typ-punct">(</span>
				<span class="arguments pl-4 md:pl-6 flex flex-col">
					{func.params.map((param, index) => (
						<span
							key={param.name}
							class="overview-param flex flex-row items-center py-0.5"
						>
							{!param.positional && (
								<div class="flex-shrink-0 mr-1">
									<a href={`#${buildParamId(param.name, prefix)}`}>
										<span>{param.name}</span>
									</a>
									<span class="typ-punct">:</span>
								</div>
							)}
							<div class="flex flex-row flex-wrap gap-1">
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
							{index < func.params.length - 1 && (
								<span class="typ-punct">,</span>
							)}
						</span>
					))}
				</span>

				<span class="typ-punct">)</span>

				{func.returns.length > 0 && (
					<>
						<span class="typ-op mx-1">-&gt;</span>
						<div class="inline-flex flex-wrap gap-1 py-0.5">
							{func.returns.map((ret, _) => {
								const href = type2href(ret);
								return (
									<TypeIcon
										key={ret}
										type={ret}
										href={
											href ? joinPath(basePath, "reference", href) : undefined
										}
									/>
								);
							})}
						</div>
					</>
				)}
			</code>
		</pre>
	);
};
