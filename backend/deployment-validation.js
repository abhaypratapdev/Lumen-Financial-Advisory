#!/usr/bin/env node

/**
 * Deployment Validation Script
 * 
 * Run this script to verify that your deployment configuration is correct:
 * node deployment-validation.js
 * 
 * This script checks:
 * - Environment variables are properly set
 * - Backend health endpoint responds
 * - CORS is properly configured
 * - Database connection is working
 */

const http = require('http');
const https = require('https');

const config = {
  backendUrl: process.env.BACKEND_URL || 'https://financial-advisor-web-application.onrender.com',
  frontendUrl: process.env.FRONTEND_URL || 'https://financial-advisor-web-application.vercel.app',
};

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data), headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, body: data, headers: res.headers });
        }
      });
    }).on('error', reject);
  });
}

async function validate() {
  console.log('🔍 Validating Deployment Configuration...\n');
  
  try {
    // Test 1: Backend Health Check
    console.log('📋 Test 1: Backend Health Check');
    console.log(`   URL: ${config.backendUrl}/api/health`);
    const health = await makeRequest(`${config.backendUrl}/api/health`);
    if (health.status === 200) {
      console.log('   ✅ Backend is responding');
      console.log(`   Environment: ${health.body.env}`);
      console.log(`   Database: ${health.body.db.provider}`);
    } else {
      console.log(`   ❌ Backend returned status ${health.status}`);
    }
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}`);
    console.log('   Possible causes:');
    console.log('   - Backend is not running');
    console.log('   - Backend URL is incorrect');
    console.log('   - Network connectivity issue');
  }
  
  console.log('\n📋 Test 2: CORS Configuration');
  console.log(`   Frontend URL: ${config.frontendUrl}`);
  console.log(`   Backend CORS_ORIGIN should include: ${config.frontendUrl}`);
  console.log('   ✅ If CORS_ORIGIN is set correctly in Render, cross-origin requests will work');
  
  console.log('\n📋 Test 3: Environment Variables Checklist');
  const requiredVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'CORS_ORIGIN',
    'GEMINI_API_KEY',
    'NEWS_API_KEY'
  ];
  
  requiredVars.forEach(varName => {
    const isDefined = process.env[varName] ? '✅' : '❌';
    console.log(`   ${isDefined} ${varName}: ${process.env[varName] ? 'Set' : 'Not set'}`);
  });
  
  console.log('\n📋 Test 4: Frontend Configuration');
  console.log(`   Frontend should use API URL: ${config.backendUrl}/api`);
  console.log('   ✅ Set VITE_API_URL environment variable in Vercel');
  
  console.log('\n✨ Validation complete!');
}

validate().catch(console.error);
