<script lang="ts">
	import { Button, Icon, InputSearch } from "@components"
	import type { ICountry } from "@/interfaces/ICountry"
	import { isArray } from "lodash"
	import { getCountries } from "@/api/country"

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
				<div class="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-red-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
						/>
					</svg>
					<a href="/" class="ml-2 font-semibold text-[#252C32] dark:text-white">OpenPaper</a>
				</div>

				<div class="ml-6 flex flex-1 gap-x-3">
					<InputSearch class="max-w-2xl" placeholder="Search something ..." />
				</div>

				<div class="ml-2 flex">
					{#if selectedCountry}
						<a class="flex items-center gap-x-2 py-2 px-4 bg-slate-700 hover:bg-slate-600 transition-colors rounded-md">
							<img class="w-6 h-4" src="data:image/png;base64, {selectedCountry.flag}" alt={selectedCountry.name} />
							<span class="text-sm font-medium">{selectedCountry.name}</span>
						</a>
					{/if}
					<div class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-900">
						<Icon name="add" />
						<span class="text-sm font-medium">Post a Topic</span>
					</div>
					<div class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
						<span class="text-sm font-medium">Sign in</span>
					</div>
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
