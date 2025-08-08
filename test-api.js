const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testAPI() {
  try {
    // Test creating a lead
    const testLead = await prisma.websiteLead.create({
      data: {
        fullName: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        companyWebsite: 'https://example.com',
        source: 'test',
      },
    });
    
    console.log('✅ Test lead created successfully:', testLead);
    
    // Clean up - delete the test lead
    await prisma.websiteLead.delete({
      where: { id: testLead.id },
    });
    
    console.log('✅ Test lead cleaned up successfully');
  } catch (error) {
    console.error('❌ Error testing API:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPI(); 