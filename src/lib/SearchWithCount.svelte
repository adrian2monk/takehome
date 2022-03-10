<script lang="ts">
	export let id: string;

	export let count: number;

	export let total: number;
</script>

<form
	action="{`/address/${id}`}"
	method="get"
>
	<input name="count" type="hidden" value="{total}" />
	<button 
		disabled={count === total} 
		class="transition rounded-md px-3 py-1 text-slate-500 font-light opacity-75 hover:bg-white hover:text-sky-200 hover:opacity-100 disabled:text-sky-300 disabled:font-medium disabled:bg-white disabled:opacity-100">{total}</button>
</form>