<script lang="ts">
	import { onMount } from "svelte"
	import type { ITopic } from "../interfaces/ITopic"
	import { Card, Button } from "../components"

	export let data: ITopic
	let element: HTMLElement

	onMount(async () => {
		if (data.medias?.length > 0 && element) {
			const { tns } = await import("tiny-slider")
			tns({
				container: element,
				items: 3,
				slideBy: "page",
				mouseDrag: true,
				swipeAngle: false,
				controls: false,
			})
		}
	})
</script>

<Card class="mb-6 py-2">
	<div class="py-2 px-6" topic-id={data.id}>
		<h1 class="text-black text-2xl title-font font-bold mb-2">{data.name}</h1>
	</div>
	<div class="select-none" bind:this={element}>
		{#each data.medias as media}
			<div class="px-4 py-2 bg-slate-100">
				<div class="aspect-[2/3]">
					<img class="w-full h-full object-contain" alt={media.name} src={media.featuredImage} />
				</div>
				<div class="text-center font-medium px-4 py-1">
					<div class="truncate text-sm">{media.name}</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="py-2 px-6 mt-2">
		<div class="mb-2">{data.description}</div>
		<Button>Explore more</Button>
	</div>
</Card>
