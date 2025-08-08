import { NextResponse } from "next/server";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    console.log("=== HEALTH CHECK DEBUG ===");
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("DATABASE_URL starts with:", process.env.DATABASE_URL?.substring(0, 20) + "...");
    
    const client = await pool.connect();
    
    // Test basic connection
    const result = await client.query('SELECT NOW() as current_time');
    
    // Check if website_leads table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'website_leads'
      );
    `);
    
    // Count existing leads
    const leadCount = await client.query('SELECT COUNT(*) as count FROM website_leads');
    
    client.release();
    
    return NextResponse.json({
      status: "healthy",
      database: {
        connected: true,
        currentTime: result.rows[0].current_time,
        websiteLeadsTableExists: tableCheck.rows[0].exists,
        leadCount: leadCount.rows[0].count
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL
      }
    });
    
  } catch (error: any) {
    console.error("Health check failed:", error);
    return NextResponse.json({
      status: "unhealthy",
      error: error.message,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL
      }
    }, { status: 500 });
  }
}
