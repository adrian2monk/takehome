export type Handler = (params: {
	form: HTMLFormElement;
	response?: Response;
	data?: FormData;
	error?: Error;
}) => Promise<void>;

export type EventHandler = {
	pending?: Handler;
	result?: Handler;
	error?: Handler;
};

export function enhance(form, { pending, error, result }: EventHandler) {
	async function handleSubmit(e) {
		e.preventDefault();
		let body = null;
		let search = new URLSearchParams();
		const data = new FormData(form);

		if (pending) {
			return pending({ data, form });
		}

		if (['GET', 'HEAD'].includes(form.method.toUpperCase())) {
			data.forEach((value, key) => search.append(key, value.toString()));
		} else {
			body = data;
		}

		try {
			const response = await fetch(form.action + '?' + search, {
				method: form.method,
				headers: { accept: 'text/html' },
				body
			});
			if (response.ok) {
				return result && result({ data, form, response });
			}
			error ? error({ data, form, error: null, response }) : console.error(await response.text());
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
