<script lang="ts">
	import type { IMessage } from "@/interfaces/IMessage"

	export let message: IMessage
</script>

<div class="flex px-4 py-3">
	<div class="h-10 w-10 rounded flex-shrink-0 bg-gray-300" />
	<div class="ml-2">
		<div class="-mt-1">
			<span class="text-sm font-semibold">{message.creatorId}</span>
			<span class="ml-1 text-xs text-gray-500">01:26</span>
		</div>
		<p class="text-sm">{message.content}</p>
	</div>
</div>
