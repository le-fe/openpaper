<script lang="ts">
	import icons from "./data-icons"
	export let name: string
	export let width = "1rem"
	export let height = "1rem"
	export let focusable: boolean = false
	let displayIcon = icons[name]
</script>

{#if displayIcon}
	<svg class={$$props.class ? ` ${$$props.class}` : ""} {focusable} {width} {height} viewBox={displayIcon.box}>
		{@html displayIcon.svg}
	</svg>
{/if}
