const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTable() {
  try {
    // Create the website_leads table
    await prisma.$executeRaw`
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
    
    console.log('✅ website_leads table created successfully!');
  } catch (error) {
    console.error('❌ Error creating table:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTable(); 