<script lang="ts">
	import type { IMessage } from "@/interfaces/IMessage"

	export let message: IMessage

	$: creatorName = message?.creatorId?.split("|")?.[0] || ""

	function getAvatar () {
		const avatarFileName = message?.creatorId?.split("|")?.[0]?.toLowerCase()?.replace(" ", "_")
		if (avatarFileName) return `/images/av/${avatarFileName}.svg`
		return ""
	}
</script>

<div class="flex px-4 py-3">
	<div class="h-10 w-10 rounded-full flex-shrink-0">
		<img src={getAvatar()} alt={message.creatorId} />
	</div>
	<div class="ml-2">
		<div class="-mt-1">
			<span class="text-sm font-semibold">{creatorName}</span>
			<span class="ml-1 text-xs text-gray-500">01:26</span>
		</div>
		<p class="text-sm">{message.content}</p>
	</div>
</div>
