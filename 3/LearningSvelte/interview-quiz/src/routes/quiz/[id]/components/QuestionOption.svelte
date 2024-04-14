<script lang="ts">
	export let option: { label: string; text: string };
</script>

<button class={`bg-gray-200 rounded w-[49%] text-center p-2 mb-4 py-5 `}>
	{option.text}
</button>
