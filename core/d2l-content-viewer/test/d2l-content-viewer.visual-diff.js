const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-content-viewer', () => {

	const visualDiff = new VisualDiff('content-viewer', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser);
		await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 });
		await page.goto(`${visualDiff.getBaseUrl()}/test/content-viewer.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	beforeEach(async() => {
		await visualDiff.resetFocus(page);
	});

	after(async() => await browser.close());

	it('passes visual-diff comparison', async function() {
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

});
