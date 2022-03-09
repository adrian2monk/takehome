<script lang="ts">

import type { Stats, User } from "./address";

const assetsApi = 'https://assets.axieinfinity.com/explorer/images/contract-icon';

let user: User;

let txs: Stats[];

type Handler = (params: {
        form: HTMLFormElement,
        response?: Response,
        data?: FormData,
        error?: Error,
}) => Promise<void>

type EventHandler = {
        pending?: Handler,
        result?: Handler,
        error?: Handler
};

function enhance(form, { pending, error, result }: EventHandler) {

        async function handleSubmit(e) {
                e.preventDefault();
                const data = new FormData(form);

                if (pending) {
			pending({ data, form });
		}

                try {
                        const response = await fetch(form.action, {
                                method: form.method,
                                headers: {
                                        accept: 'applicaiton/json'
                                },
                                body: data
                        });
                        if (response.ok) {
                                return result && result({ data, form, response });
                        }
                        error 
				? error({ data, form, error: null, response }) 
				: console.error(await response.text());
                } catch (e) {
                        if (error) {
                                return error({ data, form, error: e });
                        }
			throw e;
                }
        }

        form.addEventListener('submit', handleSubmit);
        return {
                destroy() {
                        form.removeEventListener('submit', handleSubmit);
                }
        };
}
</script>

<header class="px-6">
	<h1 class="md:text-lg text-center text-sky-500 my-5">Welcome to Ronin Chain Explorer</h1>
	<form
                class="md:max-w-md mx-auto"
                action="/address"
                method="post"
                use:enhance={{
                        result: async ({ form, response }) => {
                                const data = await response.json();
                                user = data.user;
                                txs = data.txs;
                                form.reset();
                        }
                }}
        >
		<label class="relative block">
			<span class="sr-only">Search</span>
			<span class="absolute inset-y-0 left-0 flex items-center pl-2">
				<svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
					<!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
					<path transform="scale(0.035)" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/>
				</svg>
			</span>
			<input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for ronning address..." type="search" name="address"/>
		</label>
        </form>
</header>

<main>
        {#if user}
                <div class="flex flex-wrap my-5 md:mx-4 justify-around xl:max-w-5xl xl:mx-auto">
                        <div class="overflow-hidden p-2">
                                <span class="float-left inset-y-0 flex items-center pl-2 mr-3">
                                        <svg class="h-10 w-10 fill-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                <path transform="scale(0.9)" d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/>
                                        </svg>
                                </span>
                                <h3 class="text-sm font-medium text-slate-900">User Address</h3>
                                <p class="text-sm text-slate-400 truncate underline">{user.id}</p>
                        </div>
                        <div class="md:border-0 md:drop-shadow-none drop-shadow border border-slate-300 rounded-md overflow-hidden mx-2 md:mt-0 mt-4 p-2 md:flex-none flex-auto">
                                <h3 class="text-sm font-medium text-slate-900">Account</h3>
                                <p class="text-sm font-bold uppercase" class:text-sky-500={user.account === 'scholar'} class:text-green-500={user.account === 'breeder'}>{user.account}</p>
                        </div>
                        <div class="md:border-0 md:drop-shadow-none drop-shadow border border-slate-300 rounded-md overflow-hidden mx-2 md:mt-0 mt-4 p-2 md:flex-none flex-auto">
                                <h3 class="text-sm font-medium text-slate-900">Balance</h3>
                                <div class="flex items-center">
                                        <img class="h-5 w-5" src="{assetsApi + '/ron.png'}" alt="ron currrency" />
                                        <p class="text-sm font-light text-sky-500">{user.balance} RON</p>
                                </div>
                        </div>
                        <div class="md:border-0 md:drop-shadow-none drop-shadow border border-slate-300 rounded-md overflow-hidden mx-2 md:mt-0 mt-4 p-2 md:flex-none flex-auto">
                                <h3 class="text-sm font-medium text-slate-900">ETH Balance</h3>
                                <div class="flex items-center">
                                        <img class="h-5 w-5" src="{assetsApi + '/eth.png'}" alt="ron currrency" />
                                        <p class="text-sm font-light text-green-500">{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(user.total_erc20)} WETH</p>
                                </div>
                        </div>
                        <div class="md:place-self-end md:m-0 overflow-hidden m-5">
                                <h3 class="text-sm font-medium text-slate-400">Total NFTs <span class="text-slate-900">{user.total_nfts}</span></h3> 
                        </div>
                        <div class="md:place-self-end md:m-0 overflow-hidden m-5">
                                <h3 class="text-sm font-medium text-slate-400">Total Transactions <span class="text-sky-500">{user.total_transactions}</span></h3> 
                        </div>
                </div>
        {/if}
        {#if txs}
                <h2 class="md:text-md md:mx-4 xl:max-w-5xl xl:mx-auto text-sky-300 my-3">Sneak Peak of top transaction stats</h2>
                <div class="grid md:grid-cols-3 md:grid-flow-row md:gap-4 md:mx-4 xl:max-w-5xl xl:mx-auto">
                        {#each txs as tx}
                                <section class="flex rounded-md bg-white drop-shadow-md mt-6 p-2">
                                        <img class="h-10 w-10" src="{assetsApi + '/marketplace.png'}" alt="Market Place" />
                                        <div class="ml-3 overflow-hidden">
                                                <p class="text-sm uppercase text-slate-500">{tx.name}</p>
                                                <p class="text-2xl font-bold text-slate-900">{tx.count}</p>
                                        </div>
                                </section>
                        {/each}
                </div>
        {/if}
</main>