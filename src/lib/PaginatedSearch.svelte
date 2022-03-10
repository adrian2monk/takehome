<script lang="ts">
	export let id: string;

	export let page: number;

	export let count: number;
</script>

<form action={`/address/${id}`} method="get">
	<input name="page" type="hidden" value={page} />
	<input name="count" type="hidden" value={count} />
	<slot />
</form>
