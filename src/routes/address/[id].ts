import type { Stats, Transaction, User } from '.';
import { api, decoder, type TransactionState } from './_api';

const success: TransactionState = 1;

const actionsMap = ({ input: callData, to: contractAddress }) => ({ callData, contractAddress });

const txsMap = ({ to, value, status, timestamp, hash, block_number }): Transaction => ({
	to, value, status: status === success ? 'success' : 'failure', id: hash, block: block_number, txs_date: new Date(timestamp * 1000)
});

/** @type {import('./[id]').RequestHandler} */
export async function get({ request, params }) {
	const body: { id: string, page: number, count: number, user?: User, stats?: Stats[], txs?: Transaction[] } = { id: params.id, page: 1, count: 10 };
	const search = new URL(request.url).searchParams;
	const from = search.get('page') || '0';
	const size = search.get('count') || '10';
	const [resUser, resTxs] = await Promise.all([api('GET', 'address', params.id), api('GET', 'txs', params.id, new URLSearchParams({ from, size }))]);

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
		const resTypes = await decoder('POST', 'actions', { txs: txs.map(actionsMap) });
		const stats = new Map<string, number>()
		body.txs = txs.map(txsMap);
		resTypes.status === 200 && /**  @type {import('./_api').ActionsResponse} */ (await resTypes.json()).data
			.forEach((txsType, i) => {
				stats.has(txsType) ? stats.set(txsType, stats.get(txsType) + 1) : stats.set(txsType, 1);
				body.txs[i].txs_type = txsType;
			});
		body.stats = Array.from(stats.entries()).map(([name, count]) => ({ name, count }));
		body.page = parseInt(from, 10) || 1;
		body.count = txs.length;
        }

        return { body };
}