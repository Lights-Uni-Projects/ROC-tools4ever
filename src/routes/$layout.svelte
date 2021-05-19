<script>
	import "../app.postcss";
	import { session } from "$app/stores";
</script>


<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Iceland&display=swap" rel="stylesheet">
</svelte:head>


<div class="container mx-auto">
	<div class="center float m-auto relative">
		<!-- <p class="absolute right-16 top-1">{getName()} |</p> -->
		<form class="text-right" method="POST" action="/logout">
			<button class="underline text-black-700 absolute right-0 top-1 border-1 px-2" type="submit">Log uit</button>
		</form>
		<h1 class="text-8xl text-center mb-0">ToolsForEver</h1>
	</div>
	<slot />
</div>




<div id="error-box" class="text-center absolute inset-x-0 bottom-0">
</div>
