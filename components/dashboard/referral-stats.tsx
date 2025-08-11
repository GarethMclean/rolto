"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ReferralStats {
  referrer: {
    id: string;
    fullName: string;
    company: string;
    referralCode: string;
    referralCount: number;
    joinedAt: string;
  };
  referrals: Array<{
    id: string;
    fullName: string;
    company: string;
    joinedAt: string;
  }>;
}

interface ReferralStatsProps {
  referralCode: string;
}

export default function ReferralStats({ referralCode }: ReferralStatsProps) {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (referralCode) {
      fetchReferralStats();
    }
  }, [referralCode]);

  const fetchReferralStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/referrals/${referralCode}`);
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch referral stats");
      }
    } catch (error) {
      console.error("Error fetching referral stats:", error);
      setError("Failed to fetch referral stats");
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralLink = async () => {
    const referralLink = `${window.location.origin}?ref=${referralCode}`;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy referral link:", error);
      toast.error("Failed to copy referral link");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.spinner className="h-5 w-5 animate-spin" />
            Loading referral stats...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchReferralStats} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Referral Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.users className="h-5 w-5" />
            Your Referral Stats
          </CardTitle>
          <CardDescription>
            Track your referrals and help others join the waitlist
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.referrer.referralCount}
              </div>
              <div className="text-sm text-muted-foreground">Total Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.referrals.length}
              </div>
              <div className="text-sm text-muted-foreground">Successful Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.referrer.referralCount - stats.referrals.length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>
            Share this link with your network to help them join the waitlist
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={`${window.location.origin}?ref=${referralCode}`}
              readOnly
              className="font-mono text-sm"
            />
            <Button onClick={copyReferralLink} size="sm">
              <Icons.copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Every successful referral gets you closer to early access and special perks!
          </p>
        </CardContent>
      </Card>

      {/* Referral List */}
      {stats.referrals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>People You've Referred</CardTitle>
            <CardDescription>
              {stats.referrals.length} person{stats.referrals.length !== 1 ? 's' : ''} joined through your referral
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <div className="font-medium">{referral.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                      {referral.company}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">
                      {new Date(referral.joinedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {stats.referrals.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Referrals Yet</CardTitle>
            <CardDescription>
              Start sharing your referral link to help others join the waitlist
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Icons.users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Share your referral link with colleagues, friends, and your network
              </p>
              <Button onClick={copyReferralLink}>
                Copy Referral Link
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
