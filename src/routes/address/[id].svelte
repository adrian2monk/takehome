<script lang="ts">

import { fade } from "svelte/transition";

import type { Stats, User } from ".";

import SearchWithCount from "$lib/SearchWithCount.svelte";

const assetsApi = 'https://assets.axieinfinity.com/explorer/images/contract-icon';

export let user: User;

export let txs: Stats[];

export let id: string;

export let count: number;

type Asset = 'common-contract' | 'axs' | 'eth' | 'axie' | 'marketplace' | 'slp';

$: transactions = user && parseInt(user.total_transactions, 10);

$: total = transactions < 100 ? transactions : 100;

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
        if (input.includes('weth')) {
                return 'eth';
        }
        if (input.includes('axie')) {
                return 'axie';
        }
        return 'common-contract';
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
{#if txs}
        <div class="flex mx-2 my-3 md:text-md md:mx-4 xl:max-w-5xl xl:mx-auto">
                <h2 class="grow text-sky-300">Sneak Peak of top transaction stats</h2>
                <nav class="flex gap-1 rounded-md bg-slate-100 p-1">
                        <SearchWithCount bind:id bind:count total={10} /> 
                        <SearchWithCount bind:id bind:count total={50} /> 
                        <SearchWithCount bind:id bind:count total={total} /> 
                </nav>
        </div>
        <div class="grid mx-2 md:mx-0 md:grid-cols-3 md:grid-flow-row md:gap-4 md:mx-4 xl:max-w-5xl xl:mx-auto">
                {#each txs as tx}
                        <section transition:fade class="flex rounded-md bg-white drop-shadow-md mt-6 p-2">
                                <img class="h-10 w-10" src="{assetsApi + `/${assetByType(tx.name)}.png`}" alt="Market Place" />
                                <div class="ml-3 overflow-hidden">
                                        <p class="text-sm uppercase text-slate-500">{tx.name}</p>
                                        <p class="text-2xl font-bold text-slate-900">{tx.count}</p>
                                </div>
                        </section>
                {/each}
        </div>
{/if}