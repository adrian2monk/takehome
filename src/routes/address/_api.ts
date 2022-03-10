const baseApi = 'https://explorer.roninchain.com/api';

const decoderApi = 'https://decoder.roninchain.com/decoder';

export type Address = string;

export type Timestamp = number;

export type TransactionType = string;

export type TransactionState = number;

export type Resource = 'address' | 'txs';

export type User = {
	address: Address;
	at_block?: any;
	at_tx?: any;
	balance: string;
	block_number: number;
	contract_creator?: any;
	erc20_networth: number;
	timestamp: number;
	total_nfts: number;
	transaction_count: string;
	validator?: any;
};

export type Transaction = {
	block_hash: string;
	block_number: number;
	confirmed: boolean;
	contract_address?: string;
	cumulative_gas_user: string;
	from: Address;
	gas: string;
	gas_price: string;
	gas_used: string;
	hash: string;
	input: string;
	nonce: number;
	published: Timestamp;
	status: TransactionState;
	timestamp: Timestamp;
	to: Address;
	tx_index: number;
	value: string;
};

export type ActionRequest = {
	contractAddress: Address;
	callData: string;
};

export type TransactionResponse = {
	total: number;
	results: Transaction[];
};

export type ActionsResponse = {
	data: TransactionType[];
};

export function api(method: 'GET', resource: Resource, id: Address, params?: URLSearchParams) {
	return fetch(`${baseApi}/${resource}/${id}` + (params ? `?${params.toString()}` : ''), {
		method,
		headers: {
			'content-type': 'application/json'
		}
	});
}

export function decoder(method: 'POST', resource: 'actions', data: { txs: ActionRequest[] }) {
	return fetch(`${decoderApi}/${resource}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(data)
	});
}
