import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export async function GET() {
  try {
    const client = await pool.connect();
    
    // Test the connection with a simple query
    const result = await client.query('SELECT NOW() as current_time, COUNT(*) as lead_count FROM website_leads');
    client.release();

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: {
        currentTime: result.rows[0].current_time,
        leadCount: result.rows[0].lead_count,
        databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set"
      }
    });
  } catch (error: any) {
    console.error("Database test error:", error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
      nodeEnv: process.env.NODE_ENV
    }, { status: 500 });
  }
}
