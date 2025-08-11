import { NextRequest, NextResponse } from "next/server";
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      // Get referral information
      const result = await client.query(
        `SELECT 
          id, 
          full_name, 
          email, 
          company, 
          referral_code, 
          referral_count,
          created_at
         FROM website_leads 
         WHERE referral_code = $1`,
        [code]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: "Referral code not found" },
          { status: 404 }
        );
      }

      const referral = result.rows[0];

      // Get list of people referred by this person
      const referralsResult = await client.query(
        `SELECT 
          id, 
          full_name, 
          email, 
          company, 
          created_at
         FROM website_leads 
         WHERE referred_by = $1
         ORDER BY created_at DESC`,
        [referral.id]
      );

      const response = {
        referrer: {
          id: referral.id,
          fullName: referral.full_name,
          company: referral.company,
          referralCode: referral.referral_code,
          referralCount: referral.referral_count,
          joinedAt: referral.created_at,
        },
        referrals: referralsResult.rows.map(row => ({
          id: row.id,
          fullName: row.full_name,
          company: row.company,
          joinedAt: row.created_at,
        })),
      };

      return NextResponse.json(response);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching referral information:", error);
    return NextResponse.json(
      { error: "Failed to fetch referral information" },
      { status: 500 }
    );
  }
}
