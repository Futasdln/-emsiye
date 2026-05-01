const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));
  await page.goto('https://kafm.vercel.app/', {waitUntil: 'networkidle0'});
  const rootHtml = await page.$eval('#root', el => el.innerHTML);
  console.log('ROOT HTML LENGTH:', rootHtml.length);
  console.log('ROOT HTML START:', rootHtml.slice(0, 500));
  await browser.close();
})();
