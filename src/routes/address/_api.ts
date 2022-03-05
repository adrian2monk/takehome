const base = 'https://explorer.roninchain.com/api';

export type Address = string;

export type Resource = 'address' | 'txs'

export function api(method: 'GET', resource: Resource, id: Address, data = null) {
        return fetch(`${base}/${resource}/${id}`, {
                method,
                headers: {
                        'content-type': 'application/json'
                },
                body: data && JSON.stringify(data)
        });
}