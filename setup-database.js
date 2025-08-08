// Simple script to set up the website_leads table
// Run this if you need to manually create the table

const { Pool } = require('pg');

async function setupDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const client = await pool.connect();
    
    // Create the website_leads table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS website_leads (
        id VARCHAR(191) NOT NULL,
        full_name VARCHAR(191) NOT NULL,
        email VARCHAR(191) NOT NULL,
        company VARCHAR(191) NOT NULL,
        company_website VARCHAR(191) NULL,
        source VARCHAR(191) NULL DEFAULT 'waitlist',
        created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      );
    `;

    await client.query(createTableQuery);
    console.log('✅ website_leads table created successfully!');
    
    client.release();
  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    await pool.end();
  }
}

// Only run if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  setupDatabase();
} else {
  console.log('❌ DATABASE_URL environment variable not set');
  console.log('Please set your DATABASE_URL and try again');
}
