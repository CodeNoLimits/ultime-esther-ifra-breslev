async function checkAPIs(baseUrl) {
  console.log('🔌 API HEALTH CHECK');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const endpoints = [
    '/api/products',
    '/api/auth/session',
    '/api/cart'
  ];

  let passed = 0, failed = 0;

  for (const endpoint of endpoints) {
    const url = `${baseUrl}${endpoint}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log(`✅ ${endpoint} - ${res.status}`);
        passed++;
      } else {
        console.log(`❌ ${endpoint} - ${res.status}`);
        failed++;
      }
    } catch (err) {
      console.log(`❌ ${endpoint} - ERROR: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);

  if (failed > 0) {
    console.log('\n🚨 DO NOT PRESENT - APIs failing');
    process.exit(1);
  } else {
    console.log('\n✅ ALL APIs HEALTHY');
  }
}

const baseUrl = process.argv[2] || 'http://localhost:3000';
checkAPIs(baseUrl);
