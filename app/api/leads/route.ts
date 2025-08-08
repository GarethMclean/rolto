import { NextRequest, NextResponse } from "next/server";
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    // Debug logging
    console.log("=== LEAD SUBMISSION DEBUG ===");
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("DATABASE_URL starts with:", process.env.DATABASE_URL?.substring(0, 20) + "...");
    
    const body = await request.json();
    const { fullName, email, company, companyWebsite, source } = body;

    console.log("Received data:", { fullName, email, company, companyWebsite, source });

    // Validate required fields
    if (!fullName || !email || !company) {
      console.log("Validation failed: missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation failed: invalid email format");
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

    try {
      console.log("Attempting database connection...");
      const client = await pool.connect();
      console.log("Database connection successful");

      // Check if email already exists
      const existingLead = await client.query(
        'SELECT id FROM website_leads WHERE email = $1',
        [email.toLowerCase()]
      );

      if (existingLead.rows.length > 0) {
        console.log("Email already exists:", email);
        client.release();
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 },
        );
      }

      // Generate a unique ID
      const id = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      console.log("Inserting new lead with ID:", id);

      // Create new lead
      const result = await client.query(
        `INSERT INTO website_leads (id, full_name, email, company, company_website, source)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, email, company, source, created_at`,
        [
          id,
          fullName.trim(),
          email.toLowerCase().trim(),
          company.trim(),
          cleanedWebsite,
          source || "waitlist"
        ]
      );

      client.release();

      const newLead = result.rows[0];

      console.log("Lead captured successfully:", {
        id: newLead.id,
        email: newLead.email,
        company: newLead.company,
        source: newLead.source,
        timestamp: newLead.created_at,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Lead captured successfully",
          leadId: newLead.id,
        },
        { status: 201 },
      );

    } catch (dbError: any) {
      console.error("Database error:", dbError);
      console.error("Database error code:", dbError.code);
      console.error("Database error message:", dbError.message);
      
      // Handle specific database errors
      if (dbError.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: "Failed to save lead to database" },
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
