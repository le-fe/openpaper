<script lang="ts">
	import { Icon, InputSearch, Button } from "."
	import type { ICountry } from "@/interfaces/ICountry"
	import { isArray } from "lodash"
	import { getCountries } from "@/api/country"
	import { _ } from "svelte-i18n"

	let countries: ICountry[] = []
	let selectedCountry: ICountry

	async function fetchCountries() {
		const res = await getCountries()
		if (isArray(res)) {
			countries = res
			selectedCountry = res?.[0]
		}
	}
	fetchCountries()
</script>

<header>
	<div class="">
		<div class="py-3 px-6">
			<div class="flex justify-between">
				<a href="/" class="flex items-center">
					<Icon name="logo" width="32px" height="32px" />
					<span class="ml-1 font-semibold text-primary dark:text-primary-dark">SquareMoon</span>
				</a>

				<div class="ml-6 flex flex-1 gap-x-3">
					<InputSearch class="max-w-2xl" placeholder="Search something ..." />
				</div>

				<div class="ml-2 flex">
					{#if selectedCountry}
						<div
							class="flex items-center gap-x-2 py-2 px-4 bg-slate-700 hover:bg-slate-600 transition-colors rounded-md mr-2 cursor-pointer"
						>
							<img class="w-6 h-4" src="data:image/png;base64, {selectedCountry.flag}" alt={selectedCountry.name} />
							<span class="text-sm font-medium">{selectedCountry.name}</span>
						</div>
					{/if}
					<a href="/topic/new/">
						<Button icon="add" type="primary">{$_("submitNewTopic")}</Button>
					</a>
					<Button class="capitalize ml-4">{$_("logIn")}</Button>
				</div>
			</div>

			<div class="mt-4 flex items-center justify-between">
				<div class="flex gap-x-8 items-center">
					<span class="py-1 px-2 text-xs text-gray-400"> Trending </span>
					<span
						class="cursor-pointer py-1 px-2 text-sm font-semibold hover:text-gray-900 text-gray-500 dark:text-gray-300 dark:hover:text-white"
						>New Releases</span
					>
					<span
						class="cursor-pointer py-1 px-2 text-sm font-semibold hover:text-gray-900 text-gray-500 dark:text-gray-300 dark:hover:text-white"
						>Books</span
					>
					<span
						class="cursor-pointer py-1 px-2 text-sm font-semibold hover:text-gray-900 text-gray-500 dark:text-gray-300 dark:hover:text-white"
						>Computers</span
					>
					<span
						class="cursor-pointer py-1 px-2 text-sm font-semibold hover:text-gray-900 text-gray-500 dark:text-gray-300 dark:hover:text-white"
						>Fashion</span
					>
					<span
						class="cursor-pointer py-1 px-2 text-sm font-semibold hover:text-gray-900 text-gray-500 dark:text-gray-300 dark:hover:text-white"
						>Health</span
					>
					<span
						class="cursor-pointer py-1 px-2 text-sm font-semibold hover:text-gray-900 text-gray-500 dark:text-gray-300 dark:hover:text-white"
						>Pharmacy</span
					>
					<span
						class="cursor-pointer py-1 px-2 text-sm font-semibold hover:text-gray-900 text-gray-500 dark:text-gray-300 dark:hover:text-white"
						>Toys &amp; Games</span
					>
				</div>

				<a href="/about" class="dark:text-gray-300 dark:hover:text-gray-100 text-sm font-semibold">About us</a>
			</div>
		</div>
	</div>
</header>
