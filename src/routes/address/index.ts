import { api, decoder, type Address, type TransactionState, type TransactionType } from './_api';

export type User = {
	id: Address,
	balance: string,
	total_nfts: number,
	total_erc20: number,
	total_transactions: string
};

export type Transaction = {
	id: string,
	to: Address,
	block: number,
	value: string,
	status: TransactionState,
	txs_date: Date,
	txs_type?: TransactionType,
};

/** @type {import('./index').RequestHandler} */
export async function post({ request }) {
	let body: {
		user?: User,
		txs?: Transaction[]
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
			total_transactions: user.transaction_count
		}
        }

        if (resTxs.status === 200) {
                const txs = /** @type {import('./api').TransactionResponse} */ (await resTxs.json()).results;
		const resTypes = await decoder('POST', 'decoder', txs);
		const txsMap = ({ to, value, status, timestamp, hash, block_number }) => ({
			to, value, status, id: hash, block: block_number, txs_date: new Date(timestamp)
		});
		body.txs = resTypes.status === 200 
			? /**  @type {import('./_api').ActionsResponse} */ (await resTypes.json()).data.map((txsType, i) => ({
				...txsMap(txs[i]),
				txs_type: txsType
			}))
			: txs.map(txsMap);
        }

        return {
		body,
                status: resUser.status
        };
}