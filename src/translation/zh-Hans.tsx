import { Fragment } from "hono/jsx/jsx-runtime";
import type { TooltipProps } from "../components/ui/Tooltip";
import {
	githubOrganizationUrl,
	socialLinks,
	typstOfficialDocsUrl,
	version,
} from "../metadata";
import type { TranslationComponent, TranslationObject } from "./";

const githubRepositoryUrl = socialLinks.find(({ url }) =>
	url.startsWith("https://github.com/"),
)?.url;
const qqUrl = socialLinks.find(({ url }) =>
	url.startsWith("https://qm.qq.com/"),
)?.url;
if (githubRepositoryUrl === undefined || qqUrl === undefined) {
	throw new Error(
		`The zh-Hans translation requires to provide both GitHub and QQ social links in metadata.json, but at present: GitHub = ${githubRepositoryUrl}, QQ = ${qqUrl}.`,
	);
}

export const translation: TranslationObject = {
	htmlLang: () => "zh-Hans",
	documentationTitle: () => "Typst中文文档",
	close: () => "关闭",
	closeMenu: () => "关闭菜单",
	closeSearch: () => "关闭搜索",
	openMenu: () => "打开菜单",
	openSearch: () => "打开搜索",
	showInformation: (props: { name: string }) => `具体解释${props.name}`,
	tooltipKind: (props: { kind: TooltipProps["kind"] }) => {
		const map: Record<TooltipProps["kind"], string> = {
			element: "元素函数",
			contextual: "上下文相关",
			constructor: "构造函数",
			definitions: "定义",
			parameters: "参数",
			variadic: "变长参数",
			settable: "可用set规则",
			positional: "位置参数",
			required: "必需参数",
		};
		return map[props.kind];
	},
} as const;

export const Translation: TranslationComponent = (props) => {
	switch (props.translationKey) {
		// Function tooltips
		case "elementFunction":
			return <Fragment>元素</Fragment>;
		case "elementFunctionDescription":
			return (
				<Fragment>
					元素函数可用<code>set</code>和<code>show</code>规则自定义样式。
				</Fragment>
			);
		case "contextFunction":
			return <Fragment>上下文相关函数</Fragment>;
		case "contextFunctionDescription":
			return <Fragment>上下文相关函数只能在确定上下文之后使用。</Fragment>;

		// Section tooltips
		case "constructor":
			return <Fragment>构造函数</Fragment>;
		case "constructorDescription":
			return (
				<Fragment>若某类型提供构造函数，可调用它生成该类型的新实例。</Fragment>
			);
		case "definitionsOf":
			return (
				<Fragment>
					<code>{props.name}</code>的定义
				</Fragment>
			);
		case "definitions":
			return <Fragment>定义</Fragment>;
		case "definitionsDescription":
			return (
				<Fragment>
					这些函数和类型带有附属定义。要访问这种定义，请先写上函数或类型的名称，再加上定义的名称，并用句点在中间分隔。
				</Fragment>
			);
		case "parameters":
			return <Fragment>参数</Fragment>;
		case "parametersDescription":
			return <Fragment>参数是传给函数的输入，写在函数名后的括号中。</Fragment>;

		// Parameter tooltips
		case "variadic":
			return <Fragment>变长参数</Fragment>;
		case "variadicDescription":
			return <Fragment>变长参数可以传入多次。</Fragment>;
		case "settable":
			return <Fragment>可用set规则</Fragment>;
		case "settableDescription":
			return (
				<Fragment>
					可用<code>set</code>规则设置参数，更改后续调用时的默认值。
				</Fragment>
			);
		case "positional":
			return <Fragment>位置参数</Fragment>;
		case "positionalDescription":
			return <Fragment>位置参数按顺序传入，不带参数名。</Fragment>;
		case "required":
			return <Fragment>必需参数</Fragment>;
		case "requiredDescription":
			return <Fragment>必需参数在调用函数时必须传入。</Fragment>;

		// Other texts in documentation
		case "tutorial":
			return <Fragment>教程</Fragment>;
		case "tutorialDescription":
			return <Fragment>逐步学习如何使用Typst。</Fragment>;
		case "reference":
			return <Fragment>参考手册</Fragment>;
		case "referenceDescription":
			return (
				<Fragment>Typst语法、概念、类型、函数等方面的详细参考手册。</Fragment>
			);
		case "defaultValue":
			return <Fragment>默认值：</Fragment>;
		case "stringValues":
			return <Fragment>可填写的值</Fragment>;
		case "showExample":
			return props.title ? (
				<Fragment>展开例子：{props.title}</Fragment>
			) : (
				<Fragment>展开例子</Fragment>
			);
		case "globalAttributes":
			return <Fragment>全局属性</Fragment>;
		case "deprecationWarning":
			return props.until ? (
				<Fragment>
					{props.message}；Typst {props.until}将移除该功能
				</Fragment>
			) : (
				<Fragment>{props.message}</Fragment>
			);

		// Translation statuses
		case "untranslated":
			return <Fragment>未翻译</Fragment>;
		case "untranslatedMessage":
			return <Fragment>本页尚未翻译，以下展示原文。</Fragment>;
		case "communityContent":
			return <Fragment>中文版特色内容</Fragment>;
		case "contentAddedByCommunity":
			return <Fragment>本页不属于官方文档，由中文社区独立增加。</Fragment>;
		case "partiallyTranslated":
			return <Fragment>部分翻译</Fragment>;
		case "partiallyTranslatedMessage":
			return <Fragment>本页仅部分翻译，会残余一些原文。</Fragment>;
		case "translated":
			return <Fragment>已翻译</Fragment>;
		case "translatedMessage":
			return <Fragment>本页已翻译为中文。</Fragment>;

		// Header, sidebar, and footer
		case "document":
			return <Fragment>文档</Fragment>;
		case "langVersion":
			return <Fragment>简体中文版</Fragment>;
		case "translationRate":
			return <Fragment>翻译率</Fragment>;
		case "search":
			return <Fragment>搜索</Fragment>;
		case "typstOfficialWebsite":
			return <Fragment>Typst官方网站</Fragment>;
		case "typstOfficialDocs":
			return <Fragment>Typst官方文档</Fragment>;
		case "openOfficialDocs":
			return <Fragment>转到官方文档（英文）</Fragment>;
		case "tableOfContents":
			return <Fragment>目录</Fragment>;
		case "footer":
			return (
				<Fragment>
					Translated by{" "}
					<a href={githubOrganizationUrl}>Typst Chinese Community</a>
				</Fragment>
			);
		case "previousPage":
			return <Fragment>上一页</Fragment>;
		case "nextPage":
			return <Fragment>下一页</Fragment>;

		// Site notice
		case "siteNoticeBannerTitle":
			return <Fragment>注意 / Info</Fragment>;
		case "siteNoticeBannerDescription":
			return (
				<Fragment>
					本站经 Typst GmbH 许可，提供{" "}
					<a href={typstOfficialDocsUrl}>Typst v{version} 官方文档</a>的翻译，由
					<a href={githubOrganizationUrl}>中文社区</a>维护。建议与
					<a href={typstOfficialDocsUrl}>官方文档</a>
					一同阅读，因为可能存在错译、漏译或过时信息。如有意改进翻译内容或网站本身，可在
					<a href={githubRepositoryUrl}>GitHub</a>上提出 Issue、发起 Pull
					Requests。此外，也欢迎加入
					<a href={qqUrl}>「Typst 非官方中文交流群」（QQ 793548390）</a>
					。
					<br />
					This site provides a Chinese translation of the{" "}
					<a href={typstOfficialDocsUrl}>Typst v{version} documentation</a>{" "}
					maintained by the “
					<a href={githubOrganizationUrl}>Typst Chinese Community</a>” with
					permission from Typst GmbH. We recommend using this alongside the{" "}
					<a href={typstOfficialDocsUrl}>official documentation</a>. We welcome
					contributions through Issues and Pull Requests on{" "}
					<a href={githubRepositoryUrl}>our GitHub repository</a> for both
					translation improvements and website enhancements. Feel free to join{" "}
					<a href={qqUrl}>
						our QQ chat group “Typst 非官方中文交流群” (793548390)
					</a>
					.
				</Fragment>
			);

		default:
			return null;
	}
};
