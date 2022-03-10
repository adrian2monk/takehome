import { api, type Address, type TransactionType } from './_api';

export type State = 'success' | 'failure';

export type Account = 'breeder' | 'scholar';

export type User = {
	id: Address;
	account: Account;
	balance: string;
	total_nfts: number;
	total_erc20: number;
	total_transactions: string;
};

export type Stats = {
	name: string;
	count: number;
	amount?: number;
	currency?: 'slp' | 'axs' | 'ron';
};

export type Transaction = {
	id: string;
	to: Address;
	block: number;
	value: string;
	status: State;
	txs_date: Date;
	txs_type?: TransactionType;
};

/** @type {import('./index').RequestHandler} */
export async function get({ request }) {
	const params = new URL(request.url).searchParams;
	const id = /** append hex prefix */ params.get('address').replace('ronin:', '0x');
	const resUser = await api('GET', 'address', id);

	if (resUser.status === 404) {
		return {
			status: 404,
			body: null
		};
	}

	return {
		body: { id }
	};
}
