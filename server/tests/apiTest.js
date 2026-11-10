const http = require('http');
const assert = require('assert');
const app = require('../server');

const runTests = async () => {
  console.log('====================================================');
  console.log('   PORTFOLIO API SECURITY & VALIDATION TEST SUITE   ');
  console.log('====================================================\n');

  // Start test server on random available high port
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const request = (options, postData = null) => {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          let parsed = null;
          try {
            parsed = JSON.parse(body);
          } catch (e) {
            parsed = body;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        });
      });
      req.on('error', reject);
      if (postData) {
        req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
      }
      req.end();
    });
  };

  let passed = 0;
  let failed = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`  [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  [FAIL] ${name}:`, err.message);
      failed++;
    }
  };

  try {
    // 1. Health check
    await test('GET /api/health should respond with 200 OK', async () => {
      const res = await request({
        hostname: '127.0.0.1',
        port,
        path: '/api/health',
        method: 'GET'
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, 'success');
    });

    // 2. Helmet HTTP Security headers
    await test('Security check: Helmet headers should be present', async () => {
      const res = await request({
        hostname: '127.0.0.1',
        port,
        path: '/api/health',
        method: 'GET'
      });
      assert.ok(res.headers['x-content-type-options'], 'Missing X-Content-Type-Options');
      assert.ok(res.headers['x-frame-options'], 'Missing X-Frame-Options');
    });

    // 3. API Catalog Endpoint
    await test('GET /api should return endpoints dictionary', async () => {
      const res = await request({
        hostname: '127.0.0.1',
        port,
        path: '/api',
        method: 'GET'
      });
      assert.strictEqual(res.status, 200);
      assert.ok(res.body.endpoints.auth);
      assert.ok(res.body.endpoints.projects);
      assert.ok(res.body.endpoints.contact);
    });

    // 4. Auth validation: Missing credentials
    await test('POST /api/auth/login with missing email should return 400', async () => {
      const res = await request(
        {
          hostname: '127.0.0.1',
          port,
          path: '/api/auth/login',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        },
        { password: 'some_password' }
      );
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });

    // 5. Auth validation: Invalid email format
    await test('POST /api/auth/login with invalid email format should return 400', async () => {
      const res = await request(
        {
          hostname: '127.0.0.1',
          port,
          path: '/api/auth/login',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        },
        { email: 'notanemail', password: 'password123' }
      );
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });

    // 6. Security protection: POST /api/projects without JWT should be rejected 401
    await test('POST /api/projects without JWT token should return 401 Unauthorized', async () => {
      const res = await request(
        {
          hostname: '127.0.0.1',
          port,
          path: '/api/projects',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        },
        { title: 'Hacked Project', shortDescription: 'Should not create' }
      );
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 7. Security protection: Protected contact messages route GET /api/contact without JWT
    await test('GET /api/contact without JWT token should return 401 Unauthorized', async () => {
      const res = await request({
        hostname: '127.0.0.1',
        port,
        path: '/api/contact',
        method: 'GET'
      });
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 8. Contact validation: Missing message body
    await test('POST /api/contact with incomplete payload should return 400', async () => {
      const res = await request(
        {
          hostname: '127.0.0.1',
          port,
          path: '/api/contact',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        },
        { name: 'John Doe', email: 'john@example.com' }
      );
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });

    // 9. 404 handler for undefined API routes
    await test('GET /api/undefined_route should return 404 with structured JSON', async () => {
      const res = await request({
        hostname: '127.0.0.1',
        port,
        path: '/api/undefined_route',
        method: 'GET'
      });
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

    console.log(`\n====================================================`);
    console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log(`====================================================`);
    server.close(() => {
      process.exit(failed > 0 ? 1 : 0);
    });
  } catch (err) {
    console.error('Test Suite Error:', err);
    server.close(() => {
      process.exit(1);
    });
  }
};

runTests();
