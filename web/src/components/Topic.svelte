<script lang="ts">
	import { onMount } from "svelte"
	import type { ITopic } from "../interfaces/ITopic"
	import { Card, Button, Tag } from "../components"
	import { goto } from "$app/navigation"

	export let data: ITopic
	let element: HTMLElement
	function splitTypes(types: any) {
		return types?.split(",") || []
	}

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

	function routeToPage() {
		goto(`/topic/${data.id}`)
	}
</script>

<Card class="mb-6 py-2">
	<div class="py-2 px-6" topic-id={data.id}>
		<h1 class="text-2xl title-font font-bold mb-2">{data.name}</h1>
		<div class="flex">
			{#each splitTypes(data.types) as type}
				<a class="inline-flex mr-1 mb-1 cursor-pointer"><Tag>#{type}</Tag></a>
			{/each}
		</div>
	</div>
	<div class="select-none" bind:this={element}>
		{#each data.medias as media}
			<div class="px-4 py-2 bg-slate-100 dark:bg-slate-900">
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
		<Button on:click={routeToPage}>Go to Topic</Button>
	</div>
</Card>
