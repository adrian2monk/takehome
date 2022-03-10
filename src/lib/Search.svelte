<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$lib/form';
</script>

<form
	class="md:max-w-md mx-auto"
	action="/address"
	method="get"
	use:enhance={{
		result: async ({ form, response }) => {
			const { id } = await response.json();
			await goto(`/address/${id}`);
			form.reset();
		}
	}}
>
	<label class="relative block">
		<span class="sr-only">Search</span>
		<span class="absolute inset-y-0 left-0 flex items-center pl-2">
			<svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
				<!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
				<path
					transform="scale(0.035)"
					d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
				/>
			</svg>
		</span>
		<input
			class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
			placeholder="Search for ronning address..."
			type="search"
			name="address"
		/>
	</label>
</form>
