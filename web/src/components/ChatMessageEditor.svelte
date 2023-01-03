<script lang="ts">
	import { Icon } from "@components"

	function handleKeydown(event) {
		if (event.keyCode == 13 && !event.shiftKey) {
			event.preventDefault()
			console.clear()
			console.log(JSON.stringify(event.target.value))
			return false
		}
	}
</script>

<div class="flex items-center">
	<div class="mr-2 flex-1 overflow-hidden">
		<textarea
			placeholder="Enter text"
			spellcheck="false"
			class="w-full dark:bg-gray-800 resize-none border-transparent focus:border-transparent focus:ring-0 focus:outline-none px-3 py-2 leading-tight rounded-lg"
			rows="1"
			on:keydown={handleKeydown}
		/>
	</div>
	<button class="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
		<Icon class="dark:fill-white" name="emoji" />
	</button>
	<button class="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
		<Icon class="dark:fill-white" name="file-input" />
	</button>
	<button class="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
		<Icon class="dark:fill-white" name="send-chat" />
	</button>
</div>
