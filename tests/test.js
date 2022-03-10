import { expect, test } from '@playwright/test';
import { render } from '@testing-library/svelte';

import Search from '$lib/Search.svelte';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');
});

test('should render', async () => {
	const results = render(Button, { props: { label: 'a button' } });
	expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');
});
