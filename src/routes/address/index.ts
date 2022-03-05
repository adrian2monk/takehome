import { api } from './_api';

export async function post({ request }) {
	const data = await request.formData();
	const response = await api('GET', 'address', data.get('address'))

	if (response.status === 404) {
                return {
                        body: {
                                user: null
                        }
                };
        }

        if (response.status === 200) {
                return {
                        body: {
                                user: await response.json()
                        }
                };
        }

        return {
                status: response.status
        };
}