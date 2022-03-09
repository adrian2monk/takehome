import { api, decoder, type Address, type TransactionState, type TransactionType } from './_api';

const success: TransactionState = 1;

const actionsMap = ({ input: callData, to: contractAddress }) => ({ callData, contractAddress });

const txsMap = ({ to, value, status, timestamp, hash, block_number }) => ({
	to, value, status: status === success ? 'success' : 'failure', id: hash, block: block_number, txs_date: new Date(timestamp)
});

export type State = 'success' | 'failure';

export type Account = 'breeder' | 'scholar';

export type User = {
	id: Address,
	account: Account,
	balance: string,
	total_nfts: number,
	total_erc20: number,
	total_transactions: string
};

export type Stats = {
	name: string,
	count: number
	amount?: number,
	currency?: 'slp' | 'axs' | 'ron'
};

export type Transaction = {
	id: string,
	to: Address,
	block: number,
	value: string,
	status: State,
	txs_date: Date,
	txs_type?: TransactionType,
};

/** @type {import('./index').RequestHandler} */
export async function post({ request }) {
	let body: {
		user?: User,
		txs?: Stats[]
	} = {};
	const address = /** append hex prefix */ (await request.formData()).get('address').replace('ronin:', '0x');
	const [resUser, resTxs] = await Promise.all([api('GET', 'address', address), api('GET', 'txs', address)]);

	if (resUser.status === 404) {
                return { body };
        }

        if (resUser.status === 200) {
                const user = /** @type {import('./_api').User} */ (await resUser.json());
		body.user = {
			id: user.address,
			balance: user.balance,
			total_nfts: user.total_nfts,
			total_erc20: user.erc20_networth,
			total_transactions: user.transaction_count,
			account: user.erc20_networth > 0 ? 'breeder' : 'scholar'
		}
        }

        if (resTxs.status === 200) {
                const txs = /** @type {import('./api').TransactionResponse} */ (await resTxs.json()).results;
		const resTypes = await decoder('POST', 'actions', { txs: txs.filter(tx => tx.status === success).map(actionsMap) });
		const stats = new Map<string, number>()
		resTypes.status === 200 && /**  @type {import('./_api').ActionsResponse} */ (await resTypes.json()).data
			.forEach(txsType => stats.has(txsType) ? stats.set(txsType, stats.get(txsType) + 1) : stats.set(txsType, 1));
		body.txs = Array.from(stats.entries()).map(([name, count]) => ({ name, count }));
        }

        return {
		body,
                status: resUser.status
        };
}

/** @type {import('./index').RequestHandler} */
export async function get({ request }) {
	let body: {
		txs?: Transaction[]
	} = {};

	const params = new URL(request.url).searchParams;
	const id = params.get('address');
	const from = params.get('page') || '0';
	const size = params.get('count') || '10';
	const resTxs = await api('GET', 'txs', id, new URLSearchParams({ from, size }));

	if (resTxs.status === 404) {
                return { body };
        }

	if (resTxs.status === 200) {
                const txs = /** @type {import('./api').TransactionResponse} */ (await resTxs.json()).results;
		const resTypes = await decoder('POST', 'actions', { txs: txs.map(actionsMap) });
		body.txs = resTypes.status === 200 
			? /**  @type {import('./_api').ActionsResponse} */ (await resTypes.json()).data.map((txsType, i) => ({
				...txsMap(txs[i]),
				txs_type: txsType
			}))
			: txs.map(txsMap);
        }

        return {
		body,
                status: resTxs.status
        };
}