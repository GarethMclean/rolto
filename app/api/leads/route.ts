import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, company, companyWebsite, source } = body;

    // Validate required fields
    if (!fullName || !email || !company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Clean up company website if provided
    let cleanedWebsite = null;
    if (companyWebsite && companyWebsite.trim()) {
      let website = companyWebsite.trim();
      // Add https:// if no protocol is specified
      if (!website.startsWith("http://") && !website.startsWith("https://")) {
        website = "https://" + website;
      }
      cleanedWebsite = website;
    }

    // Generate a unique ID
    const id = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      const client = await pool.connect();
      
      // Insert the lead into the database
      const query = `
        INSERT INTO website_leads (id, full_name, email, company, company_website, source, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING id
      `;
      
      const values = [
        id,
        fullName,
        email,
        company,
        cleanedWebsite,
        source || "waitlist"
      ];

      const result = await client.query(query, values);
      client.release();

      console.log("Lead captured successfully:", { id: result.rows[0].id, email });

      return NextResponse.json(
        {
          success: true,
          message: "Lead captured successfully",
          leadId: result.rows[0].id,
        },
        { status: 201 },
      );
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      
      // Check if it's a connection error
      if (dbError.code === 'ECONNREFUSED' || dbError.code === 'ENOTFOUND') {
        return NextResponse.json(
          { 
            error: "Database connection failed",
            message: "Unable to connect to database"
          },
          { status: 500 },
        );
      }

      // Check if it's a table doesn't exist error
      if (dbError.message?.includes('does not exist') || dbError.message?.includes('relation')) {
        console.error("Table 'website_leads' does not exist");
        return NextResponse.json(
          { 
            error: "Database setup incomplete",
            message: "Please contact support to complete database setup"
          },
          { status: 500 },
        );
      }

      // In development, still return success even if database fails
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Lead would be captured:", {
          id,
          fullName,
          email,
          company,
          companyWebsite: cleanedWebsite,
          source: source || "waitlist",
        });

        return NextResponse.json(
          {
            success: true,
            message: "Lead captured successfully (development mode)",
            note: "Database connection not available, but lead data was processed",
          },
          { status: 201 },
        );
      }

      // In production, return error
      return NextResponse.json(
        { 
          error: "Database error",
          message: "Failed to save lead to database"
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      { error: "Failed to process lead submission" },
      { status: 500 },
    );
  }
}
