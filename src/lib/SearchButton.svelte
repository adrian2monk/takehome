<script lang="ts">
	export let disabled: boolean;

	export let value: number;
</script>

<button
	{disabled}
	class="transition rounded-md px-3 py-1 text-slate-500 font-light opacity-75 hover:bg-white hover:text-sky-200 hover:opacity-100 disabled:text-sky-300 disabled:font-medium disabled:bg-white disabled:opacity-100"
	>{value}</button
>
