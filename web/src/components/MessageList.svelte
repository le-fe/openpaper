<script lang="ts">
	import type { IMessage } from "@/interfaces/IMessage"
	import MessageListSingle from "./MessageListSingle.svelte"

	export let messages: IMessage[] = []
</script>

{#each messages as message}
	<MessageListSingle {message} />
{/each}
