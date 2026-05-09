<script lang="ts">
	export let text: string;
</script>

<div
	class="rounded-2xl p-6 mb-6 text-center"
	style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);"
>
	<h1 class="text-white text-xl font-semibold leading-relaxed">{text}</h1>
</div>
