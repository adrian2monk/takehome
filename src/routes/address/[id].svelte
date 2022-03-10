<script lang="ts">

import { fade } from "svelte/transition";

import { formatDistanceToNow } from 'date-fns';

import type { Stats, User, Transaction } from ".";

import SearchButton from "$lib/SearchButton.svelte";

import PaginatedSearch from "$lib/PaginatedSearch.svelte";

const assetsApi = 'https://assets.axieinfinity.com/explorer/images/contract-icon';

export let user: User;

export let stats: Stats[];

export let txs: Transaction[];

export let id: string;

export let page: number;

export let count: number;

type Asset = 'common-contract' | 'axs' | 'eth' | 'axie' | 'marketplace' | 'slp';

$: transactions = user && parseInt(user.total_transactions, 10);

$: total = transactions < 100 ? transactions : 100;

$: end = Math.ceil(transactions / count);

function assetByType(txType: string): Asset {
        const input = txType.toLowerCase();
        if (input.includes('sale')) {
                return 'marketplace';
        }
        if (input.includes('axs')) {
                return 'axs';
        }
        if (input.includes('slp')) {
                return 'slp';
        }
        if (input.includes('weth') || input.includes('approve')) {
                return 'eth';
        }
        if (input.includes('axie')) {
                return 'axie';
        }
        return 'common-contract';
}

function labelByType(txType: string) {
        const input = txType.toLowerCase();
        if (input.includes('sale')) {
                return 'marketplace contract';
        }
        if (input.includes('axs')) {
                return 'axs staking pool contract';
        }
        if (input.includes('slp')) {
                return 'smooth love postion contract';
        }
        if (input.includes('weth') || input.includes('approve')) {
                return 'roning WETH contract';
        }
        if (input.includes('axie')) {
                return 'axie contract';
        }
        if (input.includes('swap')) {
                return 'katana router contract';
        }
        return 'common contract';
}

</script>

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
{#if stats}
        <div class="flex mx-2 my-3 md:text-md md:mx-4 xl:max-w-5xl xl:mx-auto">
                <h2 class="grow text-sky-300">Sneak Peak of top transaction stats</h2>
                <nav class="flex gap-1 rounded-md bg-slate-100 p-1">
                        {#if total > 10}
                                <PaginatedSearch bind:id page={1} count={10}>
                                        <SearchButton disabled={count === 10} value={10} />
                                </PaginatedSearch>
                        {/if}
                        {#if total > 50}
                                <PaginatedSearch bind:id page={1} count={50}>
                                        <SearchButton disabled={count === 50} value={50} />
                                </PaginatedSearch>
                        {/if}
                        <PaginatedSearch bind:id page={1} count={total}>
                                <SearchButton disabled={count > 50} value={total} />
                        </PaginatedSearch>
                </nav>
        </div>
        <div class="grid mx-2 md:grid-cols-3 md:grid-flow-row md:gap-4 md:mx-4 xl:max-w-5xl xl:mx-auto">
                {#each stats as tx}
                        <section transition:fade class="flex rounded-md bg-white drop-shadow-md mt-6 p-2">
                                <img class="h-10 w-10" src="{assetsApi + `/${assetByType(tx.name)}.png`}" alt="Market Place" />
                                <div class="ml-3 overflow-hidden">
                                        <p class="text-sm uppercase text-slate-500">{tx.name}</p>
                                        <p class="text-2xl font-bold text-slate-900">{tx.count}</p>
                                </div>
                        </section>
                {/each}
        </div>
        <div class="flex justify-around gap-4 mt-6 mx-2 lg:flex-row-reverse lg:justify-start lg:mx-4 xl:max-w-5xl xl:mx-auto">
                <div class="flex items-center">
                        <PaginatedSearch bind:id bind:count page={0}>
                                <button class="px-4 py-2 rounded-md hover:bg-slate-100 font-medium text-sky-500">First</button>
                        </PaginatedSearch>
                        <PaginatedSearch bind:id bind:count page={page - 1}>
                                <button disabled={page - 1 < 0} class="px-4 py-2 rounded-md hover:bg-slate-100 font-medium text-sky-500">
                                        <svg class="w-5 h-5 fill-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/>
                                        </svg>
                                </button>
                        </PaginatedSearch>
                        <span class="font-light text-slate-500">{page}&nbsp;/&nbsp;{end}</span>
                        <PaginatedSearch bind:id bind:count page={page + 1}>
                                <button disabled={page + 1 > end} class="px-4 py-2 rounded-md hover:bg-slate-100 font-medium text-sky-500">
                                        <svg class="w-5 h-5 fill-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/>
                                        </svg>
                                </button>
                        </PaginatedSearch>
                        <PaginatedSearch bind:id bind:count page={end}>
                                <button class="px-4 py-2 rounded-md hover:bg-slate-100 font-medium text-sky-500">End</button>
                        </PaginatedSearch>
                </div>
                <h3 class="hidden lg:block self-center font-light text-slate-500">Records</h3>
        </div>
        <table class="hidden border-collapse w-full table-fixed mx-2 mt-3 lg:table lg:mx-4 xl:max-w-5xl xl:mx-auto">
                <thead class="rounded-md sticky top-0 whitespace-nowrap z-sticky">
                        <tr class="font-light text-left text-sm uppercase text-slate-500 bg-slate-100">
                                <th class="p-2">tx hash</th>
                                <th class="p-2">action</th>
                                <th class="p-2">block</th>
                                <th class="p-2">age</th>
                                <th class="p-2">status</th>
                                <th class="p-2">to</th>
                                <th class="p-2">value</th>
                        </tr>
                </thead>
                <tbody>
                        {#each txs as tx}
                                <tr class="border-b hover:bg-slate-100">
                                        <td class="p-6 text-sm text-slate-400 truncate">{tx.id}</td>
                                        <td class="p-6 text-sm">{tx.txs_type}</td>
                                        <td class="p-6 text-sm">{tx.block}</td>
                                        <td class="p-6 text-sm text-slate-400 capitalize">{formatDistanceToNow(tx.txs_date, { addSuffix: true })}</td>
                                        <td class="p-6 text-sm font-medium capitalize" class:text-green-500="{tx.status === 'success'}" class:text-red-500="{tx.status === 'failure'}">{tx.status}</td>
                                        <td class="py-6 text-sm truncate">
                                                <a class="text-sky-600" href="{`/address/${tx.to}`}">
                                                        <img class="h-5 w-5 float-left" src="{assetsApi + `/${assetByType(tx.txs_type)}.png`}" alt="Market Place" />
                                                        <span class="capitalize underline truncate">{labelByType(tx.txs_type)}</span>
                                                </a>
                                        </td>
                                        <td class="p-6 text-sm font-bold">{tx.value} RON</td>
                                </tr>
                        {/each}
                </tbody>
        </table>
        <div class="lg:hidden w-full mx-2 mt-3">
                {#each txs as tx}
                        <section class="grid grid-cols-1 border-b p-2">
                                <div class="flex p-4 place-content-between">
                                        <h3 class="font-light text-left text-sm uppercase text-slate-500">tx hash</h3>
                                        <p class="text-sm text-slate-400 truncate">{tx.id}</p>
                                </div>
                                <div class="flex p-4 place-content-between">
                                        <h3 class="font-light text-left text-sm uppercase text-slate-500">action</h3>
                                        <p class="text-sm">{tx.txs_type}</p>
                                </div>
                                <div class="flex p-4 place-content-between">
                                        <h3 class="font-light text-left text-sm uppercase text-slate-500">block</h3>
                                        <p class="text-sm">{tx.block}</p>
                                </div>
                                <div class="flex p-4 place-content-between">
                                        <h3 class="font-light text-left text-sm uppercase text-slate-500">age</h3>
                                        <p class="text-sm text-slate-400 capitalize">{formatDistanceToNow(tx.txs_date, { addSuffix: true })}</p>
                                </div>
                                <div class="flex p-4 place-content-between">
                                        <h3 class="font-light text-left text-sm uppercase text-slate-500">status</h3>
                                        <p class="text-sm font-medium capitalize" class:text-green-500="{tx.status === 'success'}" class:text-red-500="{tx.status === 'failure'}">{tx.status}</p>
                                </div>
                                <div class="flex p-4 place-content-between">
                                        <h3 class="font-light text-left text-sm uppercase text-slate-500">to</h3>
                                        <a class="text-sky-600" href="{`/address/${tx.to}`}">
                                                <img class="h-5 w-5 float-left" src="{assetsApi + `/${assetByType(tx.txs_type)}.png`}" alt="Market Place" />
                                                <span class="capitalize underline truncate">{labelByType(tx.txs_type)}</span>
                                        </a>
                                </div>
                                <div class="flex p-4 place-content-between">
                                        <h3 class="font-light text-left text-sm uppercase text-slate-500">value</h3>
                                        <p class="text-sm font-bold">{tx.value} RON</p>
                                </div>
                        </section>
                {/each}
        </div>
{/if}