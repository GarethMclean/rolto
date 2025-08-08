const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixTable() {
  try {
    // Add the source column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE website_leads 
      ADD COLUMN IF NOT EXISTS source VARCHAR(191) NULL DEFAULT 'waitlist';
    `;
    
    console.log('✅ website_leads table fixed successfully!');
  } catch (error) {
    console.error('❌ Error fixing table:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixTable(); 