import { Translation } from "../../../translation/";
import { SocialLinkIcons } from "./SocialLinkIcons";

export const Footer = () => {
	return (
		<footer>
			<section class="bg-white">
				<hr class="border-t border-gray-200" />
				<div class="prose max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
					<div class="flex justify-center mt-8 space-x-6">
						<SocialLinkIcons size="md" />
					</div>
					<p class="mt-8 text-sm leading-6 text-center text-gray-600">
						<Translation translationKey="footer" />
					</p>
				</div>
			</section>
		</footer>
	);
};
