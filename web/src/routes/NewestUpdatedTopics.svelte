<script>
	const topics = [
		{
			id: 1,
			name: "Footbal Strikers",
			description: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
			featuredImage:
				"https://external-preview.redd.it/CjpOxxflemIyFJVTXjZBl29SsAooc4_psyDcC56RgZ8.jpg?auto=webp&s=f1b25beb10c3659491f675c85b2756f348a15de9",
		},
		{
			id: 2,
			name: "Unsolved cases",
			description: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
			featuredImage: "https://cdn.historycollection.com/wp-content/uploads/2017/02/keddiemurders_suspects-375x250.jpg",
		},
		{
			id: 3,
			name: "Strange fishes",
			description: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
			featuredImage:
				"https://media.npr.org/assets/img/2016/06/17/whatafishknows_wide-e2b0800c202b1751ffddfae6394e3c7825e7d333-s1400-c100.jpg",
		},
		{
			id: 4,
			name: "Hidden island",
			description: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
			featuredImage: "http://www.asiaone.com/sites/default/files/inline/images/18363_1498195373.jpg",
		},
	]
</script>

<section>
	<h2 class="mb-2 font-bold text-lg">Newest updated Topics</h2>
	<div class="">
		{#each topics as topic}
			<div class="p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
				<div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
					<img src={topic.featuredImage} />
				</div>
				<div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
					<h1 class="text-black text-2xl title-font font-bold mb-2">{topic.name}</h1>
					<p class="leading-relaxed text-base">{topic.description}</p>
					<div class="py-4">
						<div class=" inline-block mr-2">
							<div class="flex  pr-2 h-full items-center">
								<svg
									class="text-yellow-500 w-6 h-6 mr-1"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" />
									<circle cx="12" cy="12" r="9" />
									<path d="M9 12l2 2l4 -4" />
								</svg>
								<p class="title-font font-medium">Python</p>
							</div>
						</div>
						<div class="inline-block mr-2">
							<div class="flex  pr-2 h-full items-center">
								<svg
									class="text-yellow-500 w-6 h-6 mr-1"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" />
									<circle cx="12" cy="12" r="9" />
									<path d="M9 12l2 2l4 -4" />
								</svg>
								<p class="title-font font-medium">C</p>
							</div>
						</div>
						<div class=" inline-block mr-2">
							<div class="flex  pr-2 h-full items-center">
								<svg
									class="text-yellow-500 w-6 h-6 mr-1"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" />
									<circle cx="12" cy="12" r="9" />
									<path d="M9 12l2 2l4 -4" />
								</svg>
								<p class="title-font font-medium">Php</p>
							</div>
						</div>
						<div class=" inline-block mr-2">
							<div class="flex  pr-2 h-full items-center">
								<svg
									class="text-gray-500 w-6 h-6 mr-1"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10" />
									<line x1="15" y1="9" x2="9" y2="15" />
									<line x1="9" y1="9" x2="15" y2="15" />
								</svg>
								<p class="title-font font-medium">Swift</p>
							</div>
						</div>

						<div class=" inline-block mr-2">
							<div class="flex  pr-2 h-full items-center">
								<svg
									class="text-gray-500 w-6 h-6 mr-1"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10" />
									<line x1="15" y1="9" x2="9" y2="15" />
									<line x1="9" y1="9" x2="15" y2="15" />
								</svg>
								<p class="title-font font-medium">Java</p>
							</div>
						</div>
						<div class=" inline-block mr-2">
							<div class="flex  pr-2 h-full items-center">
								<svg
									class="text-gray-500 w-6 h-6 mr-1"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10" />
									<line x1="15" y1="9" x2="9" y2="15" />
									<line x1="9" y1="9" x2="15" y2="15" />
								</svg>
								<p class="title-font font-medium">Javascript</p>
							</div>
						</div>
					</div>
					<div class="md:flex font-bold text-gray-800">
						<div class="w-full md:w-1/2 flex space-x-3">
							<div class="w-1/2">
								<h2 class="text-gray-500">Title</h2>
								<p>description</p>
							</div>
							<div class="w-1/2">
								<h2 class="text-gray-500">Title</h2>
								<p>description</p>
							</div>
						</div>
						<div class="w-full md:w-1/2 flex space-x-3">
							<div class="w-1/2">
								<h2 class="text-gray-500">Title</h2>
								<p>description</p>
							</div>
							<div class="w-1/2">
								<h2 class="text-gray-500">Title</h2>
								<p>description</p>
							</div>
						</div>
					</div>
					<a class="mt-3 text-indigo-500 inline-flex items-center"
						>Learn More
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		{/each}
	</div>
</section>
