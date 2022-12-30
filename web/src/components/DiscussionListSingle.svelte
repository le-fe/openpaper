<script lang="ts">
	import { Card } from "@components"
	import type { IDiscussion } from "@/interfaces"

	export let discussion: IDiscussion
</script>

<Card class="flex items-start px-4 py-3">
	<div class="w-16 h-16 overflow-hidden rounded-full">
		<img class="object-cover h-full w-full" alt={discussion.title} src={discussion.featuredImage} />
	</div>
	<div class="ml-2">
		<div class="">{discussion.title}</div>
		<div class="text-lg font-medium">{discussion.title}</div>
	</div>
</Card>
