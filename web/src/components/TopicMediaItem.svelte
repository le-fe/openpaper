<script lang="ts">
	import type { IMedia } from "../interfaces/IMedia"
	import Image from "./core/Image/Image.svelte"
	import Icon from "./core/Icon/Icon.svelte"
	import Popper from "./core/Popper/Popper.svelte"
	import { MenuList, MenuItem } from "./core/Menu"
	import { _ } from "svelte-i18n"

	export let media: IMedia
</script>

<div class="relative cursor-pointer rounded-xl">
	<div class="aspect-[2/3] rounded-lg overflow-hidden">
		<Image class="w-full h-full object-cover" alt={media.name} src={media.featuredImage} />
	</div>
	<div class="mt-2">
		<div class="flex items-center truncate">
			<div class="flex-1 truncate">
				<span class="text-base leading-none font-medium">{media.name}</span>
			</div>
			<div class="ml-2">
				<Popper>
					<button slot="trigger" class="w-5 h-5 dark:hover:bg-slate-800 rounded-full all-center">
						<Icon class="dark:fill-white" name="more" />
					</button>
					<div class="max-w-sm" slot="content">
						<div class="text-xs px-2 pt-1">{$_("youCanRequestChangeRemoveItem")}</div>
						<MenuList class="mt-2">
							<MenuItem class="font-medium">{$_("viewDiscussion")}</MenuItem>
							<MenuItem class="font-medium">{$_("requestUpdate")}</MenuItem>
							<MenuItem class="font-medium">{$_("requestRemove")}</MenuItem>
							<MenuItem class="font-medium">{$_("report")}</MenuItem>
						</MenuList>
					</div>
				</Popper>
			</div>
		</div>
	</div>
</div>
