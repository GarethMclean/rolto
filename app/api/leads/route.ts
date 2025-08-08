import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

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

    try {
      // Try to create website lead in database using Prisma ORM
      await prisma.websiteLead.create({
        data: {
          fullName,
          email,
          company,
          companyWebsite: cleanedWebsite,
          source: source || "waitlist",
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Lead captured successfully",
        },
        { status: 201 },
      );
    } catch (dbError) {
      console.error("Database error:", dbError);

      // In development, still return success even if database fails
      if (process.env.NODE_ENV === "development") {
        console.log("Development mode: Lead would be captured:", {
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
        { error: "Database connection failed" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error creating website lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 },
    );
  }
}
