<script lang="ts">
	import type { IMedia } from "../interfaces/IMedia"
	export let media: IMedia
</script>

<div class="cursor-pointer p-4 border dark:border-gray-600 dark:hover:bg-slate-600 transition-colors rounded-xl">
	<div class="aspect-[2/3]">
		<img class="w-full h-full object-contain" alt="Torres Strait Islands" src={media.featuredImage} />
	</div>
	<div class="text-center mt-3">
		<span class="text-base leading-none">{media.name}</span>
	</div>
</div>
