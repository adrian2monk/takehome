import { expect, test } from '@playwright/test';

const testAddress = '0x4d51e82c92c5e89176f006d8425330aa5ff3a4c4';

test('index page should search by address', async ({ page }) => {
	await page.goto('/');
	expect(await page.locator('input')).toBeEmpty();
	await page.fill('input', testAddress);
	await page.dispatchEvent('form', 'submit');
	await page.waitForNavigation();
	expect(new URL(page.url()).pathname).toBe(`/address/${testAddress}`);
});

test('address page should render all the content', async ({ page }) => {
	await page.goto(`/address/${testAddress}`);
	expect(await page.textContent('p:below(:text("User Address"))')).toBe(testBody.user.id);
	expect(await page.textContent('p:below(:text("Account"))')).toBe(testBody.user.account);
	expect(await page.locator('#stats > section').count()).toBe(testBody.stats.length);
	expect(await page.locator('#txs > section').count()).toBe(testBody.txs.length);
});

const testBody = JSON.parse(`
{"id":"0x4d51e82c92c5e89176f006d8425330aa5ff3a4c4","page":1,"count":10,"user":{"id":"0x4d51e82c92c5e89176f006d8425330aa5ff3a4c4","balance":"0","total_nfts":0,"total_erc20":0,"total_transactions":"72","account":"scholar"},"txs":[{"to":"0xa8754b9fa15fc18bb59458815510e40a12cd2014","value":"0","status":"success","id":"0x922faa0e0728b40ba427815b904310b88217fb0ad1ccbbb1a2e264a9a12ea3dc","block":11352654,"txs_date":1645642896000,"txs_type":"Transfer SLP"},{"to":"0xa8754b9fa15fc18bb59458815510e40a12cd2014","value":"0","status":"success","id":"0x9eeed3b096e1f0f92c25bad4d28aaa17a6507431d4cbf556135bf7673d1dd260","block":11352645,"txs_date":1645642869000,"txs_type":"Transfer SLP"},{"to":"0xa8754b9fa15fc18bb59458815510e40a12cd2014","value":"0","status":"success","id":"0xf8d4c42b18eb2d326eee9df589eb6abfa6acd00737a731f5c097fb0c9f523b8e","block":11352456,"txs_date":1645642302000,"txs_type":"Claim SLP"},{"to":"0x32950db2a7164ae833121501c797d79e7b79d74c","value":"0","status":"success","id":"0xd9b8b64d62c3d459df04dd8ae1091458378e67499642b7a0fdf28edf79f86e43","block":11300121,"txs_date":1645485296000,"txs_type":"Transfer Axie"},{"to":"0x32950db2a7164ae833121501c797d79e7b79d74c","value":"0","status":"success","id":"0xd22f53ef93b9fcb86ba29699b4ce0be1e3e231e157adfcd63a83f82ab6d8c08c","block":11300108,"txs_date":1645485257000,"txs_type":"Transfer Axie"},{"to":"0x32950db2a7164ae833121501c797d79e7b79d74c","value":"0","status":"success","id":"0x608dc47cfb141af79859c4871d36354e28048abb832760725cce3a6a67e10ca1","block":11300088,"txs_date":1645485197000,"txs_type":"Transfer Axie"},{"to":"0xa8754b9fa15fc18bb59458815510e40a12cd2014","value":"0","status":"success","id":"0x6f943772bf10dcbfc7d138818799e2ad0e4e933a7cc53132ba540ca2b499d08a","block":10922590,"txs_date":1644352545000,"txs_type":"Transfer SLP"},{"to":"0xa8754b9fa15fc18bb59458815510e40a12cd2014","value":"0","status":"success","id":"0x85e96e19526cab13cc48a144f385938c8cf909cd583cc52d085e5eec6791aa13","block":10922582,"txs_date":1644352521000,"txs_type":"Transfer SLP"},{"to":"0xa8754b9fa15fc18bb59458815510e40a12cd2014","value":"0","status":"success","id":"0x7d566b98d9ddbee84f3c3a89cdf2ea43cece076c20b746bf864d5987689ff916","block":10913977,"txs_date":1644326705000,"txs_type":"Claim SLP"},{"to":"0xa8754b9fa15fc18bb59458815510e40a12cd2014","value":"0","status":"success","id":"0x8cead04acd871ad52f36a74af039b061cd5fb0845535f124d324a1ce225b5183","block":10380213,"txs_date":1642725306000,"txs_type":"Transfer SLP"}],"stats":[{"name":"Transfer SLP","count":5},{"name":"Claim SLP","count":2},{"name":"Transfer Axie","count":3}]}
`);
