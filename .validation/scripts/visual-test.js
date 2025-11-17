const { chromium } = require('playwright');
const fs = require('fs');

async function visualTest(url, benchmarkUrl) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  console.log('📸 Taking screenshots...');

  // Desktop
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({
    path: '.validation/screenshots/current-desktop.png',
    fullPage: true
  });

  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({
    path: '.validation/screenshots/current-mobile.png',
    fullPage: true
  });

  // Benchmark
  if (benchmarkUrl) {
    const benchPage = await context.newPage();
    await benchPage.goto(benchmarkUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await benchPage.screenshot({
      path: '.validation/screenshots/benchmark.png',
      fullPage: true
    });
  }

  await browser.close();

  console.log('✅ Screenshots saved');
  generateReport(url, benchmarkUrl);
}

function generateReport(url, benchmarkUrl) {
  const html = `<!DOCTYPE html>
<html><head><title>Visual Report</title>
<style>body{font-family:Inter,sans-serif;padding:40px;background:#0f172a;color:#fff}
.comparison{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:40px 0}
.screenshot{border:2px solid #334155;border-radius:8px;overflow:hidden}
.screenshot img{width:100%;height:auto}
.screenshot h3{padding:16px;background:#1e293b;margin:0}
.mobile{max-width:400px}</style></head>
<body><h1>📸 Visual Validation</h1>
<p>Date: ${new Date().toLocaleString()}</p>
<h2>Desktop</h2><div class="comparison">
<div class="screenshot"><h3>Current</h3><img src="screenshots/current-desktop.png"></div>
<div class="screenshot"><h3>Benchmark</h3><img src="screenshots/benchmark.png"></div></div>
<h2>Mobile</h2><div class="screenshot mobile"><h3>Current Mobile</h3>
<img src="screenshots/current-mobile.png"></div></body></html>`;

  fs.writeFileSync('.validation/visual-report.html', html);
  console.log('✅ Report: .validation/visual-report.html');
}

const url = process.argv[2];
const benchmark = process.argv[3] || 'https://stripe.com';
visualTest(url, benchmark).catch(console.error);
