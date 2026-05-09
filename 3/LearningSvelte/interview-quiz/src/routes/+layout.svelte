<script>
	import '../app.css';
</script>

<div class="w-full max-w-2xl mx-auto px-4 py-10 min-h-screen flex flex-col justify-center">
	<slot />
</div>

<style>
	:global(html) {
		background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
		background-attachment: fixed;
		min-height: 100vh;
		color: #f1f5f9;
	}
	:global(body) {
		min-height: 100vh;
	}
</style>
