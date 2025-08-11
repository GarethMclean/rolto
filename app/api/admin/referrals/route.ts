import { NextRequest, NextResponse } from "next/server";
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect();

    try {
      // Get all leads with referral information
      const leadsResult = await client.query(
        `SELECT 
          id, 
          full_name, 
          email, 
          company, 
          referral_code, 
          referral_count,
          referred_by,
          created_at
         FROM website_leads 
         ORDER BY created_at DESC`
      );

      const leads = leadsResult.rows;

      // Calculate statistics
      const totalLeads = leads.length;
      const totalReferrals = leads.filter(lead => lead.referred_by).length;
      const conversionRate = totalLeads > 0 ? (totalReferrals / totalLeads) * 100 : 0;
      
      // Find top referrer
      const topReferrer = leads
        .filter(lead => lead.referral_count > 0)
        .sort((a, b) => b.referral_count - a.referral_count)[0] || { full_name: "", referral_count: 0 };

      const stats = {
        totalLeads,
        totalReferrals,
        conversionRate,
        topReferrer: {
          name: topReferrer.full_name,
          count: topReferrer.referral_count
        }
      };

      // Format leads data
      const referrals = leads.map(lead => ({
        id: lead.id,
        fullName: lead.full_name,
        email: lead.email,
        company: lead.company,
        referralCode: lead.referral_code,
        referralCount: lead.referral_count,
        referredBy: lead.referred_by,
        createdAt: lead.created_at,
      }));

      return NextResponse.json({
        referrals,
        stats
      });

    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching referral data:", error);
    return NextResponse.json(
      { error: "Failed to fetch referral data" },
      { status: 500 }
    );
  }
}
