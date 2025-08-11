import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import LeadCaptureModal from "@/components/modals/lead-capture-modal";

interface ReferralPageProps {
  params: { code: string };
}

async function getReferralInfo(code: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/referrals/${code}`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error("Error fetching referral info:", error);
    return null;
  }
}

export default async function ReferralPage({ params }: ReferralPageProps) {
  const { code } = params;
  const referralInfo = await getReferralInfo(code);

  if (!referralInfo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Icons.users className="size-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              You've been invited to join Rolto!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {referralInfo.referrer.fullName} from {referralInfo.referrer.company} thinks you'd love Rolto
            </p>
          </div>

          {/* Referral Stats */}
          <Card className="mx-auto mb-12 max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Referral from</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {referralInfo.referrer.fullName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {referralInfo.referrer.company}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Has helped {referralInfo.referrer.referralCount} people join
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What is Rolto */}
          <Card className="mx-auto mb-12 max-w-3xl">
            <CardHeader>
              <CardTitle className="text-2xl">What is Rolto?</CardTitle>
              <CardDescription>
                The AI-powered customer support solution that works 24/7
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">🚀 For Businesses</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Capture leads while you focus on growth</li>
                    <li>• Answer customer questions instantly</li>
                    <li>• Provide 24/7 support without extra staff</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">💡 For Customers</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Get instant answers to your questions</li>
                    <li>• No more waiting for business hours</li>
                    <li>• Seamless support experience</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Ready to transform your customer support?
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Join the waitlist and be among the first to experience the future of customer engagement
            </p>
            <LeadCaptureModal 
              isOpen={false} 
              onClose={() => {}} 
            />
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              This invitation was sent by {referralInfo.referrer.fullName} from {referralInfo.referrer.company}
            </p>
            <p className="mt-2">
              Referral code: <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">{code}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
