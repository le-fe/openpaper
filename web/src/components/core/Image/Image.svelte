<script>
	import Waypoint from "svelte-waypoint"
	import { fade } from "svelte/transition"

	export let alt = ""
	export let width = ""
	export let height = ""
	export let src = ""
	export let thumbnail = ""

	let loaded = false
	let loading = false

	function load() {
		const img = new Image()
		img.src = src
		loading = true

		img.onload = () => {
			loading = false
			loaded = true
		}
	}
</script>

<Waypoint class={$$props.class} once on:enter={load} style="height: {height}px" offset="0">
	{#if loaded}
		<img class={$$props.class} {src} {alt} {width} {height} />
	{:else if thumbnail}
		<img class={$$props.class} src={thumbnail} {alt} {width} {height} />
	{:else if loading}
		<slot name="loading" />
	{/if}
</Waypoint>
