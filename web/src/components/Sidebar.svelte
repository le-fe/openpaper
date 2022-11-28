<script>
	let sidebarList = [
		{
			id: "games",
			title: "Games",
			featuredImage: "https://image.thanhnien.vn/w1024/Uploaded/2022/fsmym/2022_01_18/game-duoc-mong-doi-2022-phan2-04-4595.jpeg",
		},
		{
			id: "cartoon",
			title: "Cartoon",
			featuredImage: "https://i.ytimg.com/vi/il_93l4wj_0/maxresdefault.jpg",
		},
		{
			id: "sport",
			title: "Sport",
			featuredImage: "https://img.freepik.com/free-vector/seamless-sports-pattern-background_98292-4294.jpg?w=2000",
		},
	]
</script>

<div class="max-w-2xl mx-auto">
	<aside class="" aria-label="Sidebar">
		<div class="overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
			<ul class="space-y-2">
				{#each sidebarList as item}
					<li>
						<a
							href="#"
							class="flex flex-col items-center justify-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
						>
							<div class="w-full aspect-square rounded-full overflow-hidden">
								<img class="w-full h-full object-cover" alt={item.title} src={item.featuredImage} />
							</div>
							<span class="text-xs mt-1">{item.title}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
</div>
