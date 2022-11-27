<script>
	const topics = [
		{
			id: 1,
			name: "Footbal Strikers",
			featuredImage:
				"https://external-preview.redd.it/CjpOxxflemIyFJVTXjZBl29SsAooc4_psyDcC56RgZ8.jpg?auto=webp&s=f1b25beb10c3659491f675c85b2756f348a15de9",
		},
		{
			id: 2,
			name: "Unsolved cases",
			featuredImage: "https://cdn.historycollection.com/wp-content/uploads/2017/02/keddiemurders_suspects-375x250.jpg",
		},
		{
			id: 3,
			name: "Strange fishes",
			featuredImage:
				"https://media.npr.org/assets/img/2016/06/17/whatafishknows_wide-e2b0800c202b1751ffddfae6394e3c7825e7d333-s1400-c100.jpg",
		},
		{
			id: 4,
			name: "Hidden island",
			featuredImage: "http://www.asiaone.com/sites/default/files/inline/images/18363_1498195373.jpg",
		},
	]
</script>

<section>
	<h2 class="mb-2 font-bold text-lg">Trending Topics</h2>
	<div class="grid grid-cols-4 gap-4">
		{#each topics as topic}
			<div
				class="w-full aspect-[4/3] bg-no-repeat bg-cover rounded-lg overflow-hidden card-with-overlay"
				style="background-image: url('{topic.featuredImage}')"
			>
				<div class="inner-content flex flex-col p-4 h-full justify-end">{topic.name}</div>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.card-with-overlay {
		position: relative;
		color: #fff;
		.inner-content {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			z-index: 10;
		}
	}
	.card-with-overlay::before {
		z-index: 3;
		bottom: 0;
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		background-image: linear-gradient(
			0deg,
			#000,
			rgba(0, 0, 0, 0.8) 25%,
			rgba(0, 0, 0, 0.6) 50%,
			rgba(0, 0, 0, 0.4) 75%,
			rgba(0, 0, 0, 0.2)
		);
	}
</style>
