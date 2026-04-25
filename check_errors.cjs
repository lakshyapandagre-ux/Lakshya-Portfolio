const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'artifacts/screenshot.png' });
    console.log('Screenshot saved!');
    await browser.close();
  } catch (err) {
    console.error('Script Error:', err);
  }
})();
