const { chromium } = require('playwright');

async function testButtons(url) {
  console.log('🔘 BUTTON TEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  const buttons = await page.locator('button, a[role="button"], input[type="submit"]').all();
  console.log(`Found ${buttons.length} buttons`);

  let errors = [];

  for (const btn of buttons) {
    const text = await btn.textContent();
    try {
      await btn.hover();
      await page.waitForTimeout(100);

      const style = await btn.evaluate(el => {
        const s = window.getComputedStyle(el);
        return {
          transform: s.transform,
          boxShadow: s.boxShadow
        };
      });

      if (style.transform === 'none' && style.boxShadow === 'none') {
        errors.push(`❌ "${text}" - No hover effect`);
      } else {
        console.log(`✅ "${text}" - OK`);
      }
    } catch (err) {
      errors.push(`❌ "${text}" - ${err.message}`);
    }
  }

  await browser.close();

  if (errors.length > 0) {
    console.log(`\n❌ Errors: ${errors.length}`);
    errors.forEach(e => console.log(e));
    process.exit(1);
  } else {
    console.log('\n✅ ALL BUTTONS OK');
  }
}

const url = process.argv[2] || 'http://localhost:3000';
testButtons(url).catch(console.error);
