<script>
	import { onMount, onDestroy } from "svelte"
	import { tweened } from "svelte/motion"
	import { linear } from "svelte/easing"
	import { toast } from "./stores"
	export let item
	const progress = tweened(item.initial, { duration: item.duration, easing: linear })
	const close = () => toast.pop(item.id)
	const autoclose = () => {
		if ($progress === 1 || $progress === 0) {
			close()
		}
	}
	let next = item.initial
	let prev = next
	let paused = false
	$: if (next !== item.next) {
		next = item.next
		prev = $progress
		paused = false
		progress.set(next).then(autoclose)
	}
	const pause = () => {
		if (!paused && $progress !== next) {
			progress.set($progress, { duration: 0 })
			paused = true
		}
	}
	const resume = () => {
		if (paused) {
			const d = item.duration
			const duration = d - d * (($progress - prev) / (next - prev))
			progress.set(next, { duration }).then(autoclose)
			paused = false
		}
	}
	let componentProps = {}
	$: if (item.component) {
		const { props = {}, sendIdTo } = item.component
		componentProps = { ...props, ...(sendIdTo && { [sendIdTo]: item.id }) }
	}
	const check = (prop, kind = "undefined") => typeof prop === kind
	// `progress` has been renamed to `next`; shim included for backward compatibility, to remove in next major
	$: if (!check(item.progress)) {
		item.next = item.progress
	}
	let unlisten
	const listen = (d = document) => {
		if (check(d.hidden)) return
		const handler = () => (d.hidden ? pause() : resume())
		const name = "visibilitychange"
		d.addEventListener(name, handler)
		unlisten = () => d.removeEventListener(name, handler)
		handler()
	}
	onMount(listen)
	onDestroy(() => {
		if (check(item.onpop, "function")) {
			item.onpop(item.id)
		}
		unlisten && unlisten()
	})
</script>

<div
	class="_toastItem"
	class:pe={item.pausable}
	on:mouseenter={() => {
		if (item.pausable) pause()
	}}
	on:mouseleave={resume}
>
	<div role="status" class="_toastMsg" class:pe={item.component}>
		{#if item.component}
			<svelte:component this={item.component.src} {...componentProps} />
		{:else}
			{@html item.msg}
		{/if}
	</div>
	{#if item.dismissable}
		<div
			class="_toastBtn pe"
			role="button"
			tabindex="0"
			on:click={close}
			on:keydown={(e) => {
				if (e instanceof KeyboardEvent && ["Enter", " "].includes(e.key)) close()
			}}
		/>
	{/if}
	<progress class="_toastBar" value={$progress} />
</div>

<style>
	._toastItem {
		width: var(--toastWidth, 16rem);
		height: var(--toastHeight, auto);
		min-height: var(--toastMinHeight, 3.5rem);
		margin: var(--toastMargin, 0 0 0.5rem 0);
		padding: var(--toastPadding, 0);
		background: var(--toastBackground, rgba(66, 66, 66, 0.9));
		color: var(--toastColor, #fff);
		box-shadow: var(--toastBoxShadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
		border: var(--toastBorder, none);
		border-radius: var(--toastBorderRadius, 0.125rem);
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		will-change: transform, opacity;
		-webkit-tap-highlight-color: transparent;
	}
	._toastMsg {
		padding: var(--toastMsgPadding, 0.75rem 0.5rem);
		flex: 1 1 0%;
	}
	.pe,
	._toastMsg :global(a) {
		pointer-events: auto;
	}
	._toastBtn {
		width: var(--toastBtnWidth, 2rem);
		height: var(--toastBtnHeight, 100%);
		cursor: pointer;
		outline: none;
	}
	._toastBtn::after {
		content: var(--toastBtnContent, "✕");
		font: var(--toastBtnFont, 1rem sans-serif);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	._toastBar {
		top: var(--toastBarTop, auto);
		right: var(--toastBarRight, auto);
		bottom: var(--toastBarBottom, 0);
		left: var(--toastBarLeft, 0);
		height: var(--toastBarHeight, 6px);
		width: var(--toastBarWidth, 100%);
		position: absolute;
		display: block;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border: none;
		background: transparent;
		pointer-events: none;
	}
	._toastBar::-webkit-progress-bar {
		background: transparent;
	}
	/* `--toastProgressBackground` renamed to `--toastBarBackground`; override included for backward compatibility */
	._toastBar::-webkit-progress-value {
		background: var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)));
	}
	._toastBar::-moz-progress-bar {
		background: var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)));
	}
</style>
