<script lang="ts">
	import { onMount } from "svelte"
	import { isArray } from "lodash"
	import { getTrendingTypes } from "../api/type"
	import type { IType } from "../interfaces/IType"

	/**
	 * @type {IType[]}
	 */
	let typeList: IType[] = []
	onMount(() => fetchTrendingTypes())

	async function fetchTrendingTypes() {
		const res = await getTrendingTypes()
		if (isArray(res)) {
			typeList = res
		}
	}
</script>

<div class="max-w-2xl mx-auto">
	<aside class="" aria-label="Sidebar">
		<div class="overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
			<ul class="space-y-2">
				{#each typeList as item}
					<li>
						<a
							href="#"
							class="flex flex-col items-center justify-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
						>
							<div class="w-full aspect-square rounded-full overflow-hidden">
								<img class="w-full h-full object-cover" alt={item.name} src={item.featuredImage} />
							</div>
							<span class="text-xs mt-1">#{item.name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
</div>
