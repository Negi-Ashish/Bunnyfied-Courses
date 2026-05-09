<script lang="ts">
	export let option: { label: string; text: string };
	export let selectedOption: null | string;
	export let handleChangeOption: (label: string) => void;
	export let submitted: boolean;
</script>

<button
	class={`bg-gray-200 rounded w-[49%] text-center p-2 mb-4 py-5 ${
		option.label === selectedOption ? 'bg-yellow-200' : ''
	}`}
	on:click={() => handleChangeOption(option.label)}
	disabled={submitted}
>
	{option.text}
</button>
