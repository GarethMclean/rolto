"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/shared/icons";
import { toast } from "sonner";

interface ReferralData {
  id: string;
  fullName: string;
  email: string;
  company: string;
  referralCode: string;
  referralCount: number;
  referredBy: string | null;
  createdAt: string;
}

export default function ReferralsTable() {
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalReferrals: 0,
    conversionRate: 0,
    topReferrer: { name: "", count: 0 }
  });

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/referrals");
      
      if (response.ok) {
        const data = await response.json();
        setReferrals(data.referrals);
        setStats(data.stats);
      } else {
        toast.error("Failed to fetch referral data");
      }
    } catch (error) {
      console.error("Error fetching referrals:", error);
      toast.error("Failed to fetch referral data");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReferrals = referrals.filter(referral =>
    referral.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icons.spinner className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Icons.users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              People who joined the waitlist
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Icons.share className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">
              Referrals made through the system
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Icons.trendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              % of leads with referrals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Referrer</CardTitle>
            <Icons.star className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topReferrer.count}</div>
            <p className="text-xs text-muted-foreground">
              {stats.topReferrer.name || "No referrals yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search by name, email, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={fetchReferrals}>
          <Icons.refresh className="size-4" />
        </Button>
      </div>

      {/* Referrals Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Company</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Referral Code</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Referrals</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Referred By</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">
                    {referral.fullName}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {referral.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {referral.company}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <code className="rounded bg-muted px-2 py-1 text-xs">
                      {referral.referralCode}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant={referral.referralCount > 0 ? "default" : "secondary"}>
                      {referral.referralCount}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {referral.referredBy ? (
                      <Badge variant="outline">Referred</Badge>
                    ) : (
                      <span className="text-muted-foreground">Direct</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredReferrals.length === 0 && (
        <div className="py-8 text-center">
          <Icons.users className="mx-auto mb-4 size-12 text-muted-foreground" />
          <p className="text-muted-foreground">
            {searchTerm ? "No referrals found matching your search." : "No referrals yet."}
          </p>
        </div>
      )}
    </div>
  );
}
