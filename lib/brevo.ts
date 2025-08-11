export async function sendWaitlistConfirmationEmail(
  email: string,
  firstName: string,
  referralLink: string
) {
  const senderEmail = "notifications@rolto.io";
  
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "Rolto Team",
          email: "notifications@rolto.io",
        },
        to: [
          {
            email: email,
            name: firstName,
          },
        ],
        subject: "Welcome to Rolto - Waitlist Confirmation",
        htmlContent: generateEmailHTML(firstName, referralLink),
        // Aggressive headers to force sender name display
        headers: {
          'X-Mailer': 'Rolto Waitlist System',
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          'Importance': 'Normal',
          'From': 'Rolto Team <notifications@rolto.io>',
          'Reply-To': 'contact@rolto.io',
          'Sender': 'Rolto Team <notifications@rolto.io>',
          'X-Sender': 'Rolto Team <notifications@rolto.io>',
          'X-From': 'Rolto Team <notifications@rolto.io>',
          'X-Originating-Email': 'Rolto Team <notifications@rolto.io>',
          'X-Email-From': 'Rolto Team <notifications@rolto.io>',
          'X-Sender-Name': 'Rolto Team',
          'X-Email-Sender': 'Rolto Team',
          // Additional headers to improve deliverability and reduce suspicion
          'X-Auto-Response-Suppress': 'OOF, AutoReply',
          'X-Precedence': 'bulk',
          'X-Report-Abuse': 'Please report abuse here: abuse@rolto.io',
          'List-Unsubscribe': '<mailto:unsubscribe@rolto.io>',
          'Precedence': 'bulk',
          'Auto-Submitted': 'auto-generated',
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      throw new Error(`Brevo API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

function generateEmailHTML(firstName: string, referralLink: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Welcome to Rolto! You're officially on our waitlist. Share your referral link to get early access.">
    <title>Welcome to Rolto</title>
    <style>
        @media (max-width: 600px) {
            .container { padding: 12px !important; }
            .mobile-text { font-size: 16px !important; }
            .mobile-heading { font-size: 24px !important; }
            .mobile-padding { padding: 20px 16px !important; }
            .mobile-header-padding { padding: 40px 16px 20px !important; }
            .mobile-referral-padding { margin: 0 16px 20px !important; }
            .mobile-main-heading { 
                font-size: 28px !important; 
                line-height: 1.2 !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
            .mobile-subheading { font-size: 16px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif; background-color: #ffffff; color: #1d1d1f; line-height: 1.5;">
    
    <!-- Hidden preview text - removed since we're controlling it with first visible text -->
    
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Sender Name Display (Fallback) -->
        <div style="text-align: left; padding: 20px 40px 0; border-bottom: 1px solid #f0f0f0;">
            <p style="font-size: 14px; margin: 0; color: #86868b; font-weight: 500;">
                From: <span style="color: #1d1d1f; font-weight: 600;">Rolto Team</span>
            </p>
        </div>
        
        <!-- Header -->
        <div class="mobile-header-padding" style="text-align: center; padding: 60px 40px 40px;">
            <h1 class="mobile-main-heading" style="font-size: 36px; font-weight: 600; margin: 0 0 16px; color: #1d1d1f;">
                🎯 Welcome to Rolto!
            </h1>
            <p class="mobile-subheading" style="font-size: 18px; margin: 0; color: #86868b;">
                You're officially on our waitlist
            </p>
        </div>
        
        <!-- Main Content -->
        <div class="mobile-padding" style="padding: 0 40px 40px;">
            <p style="font-size: 16px; margin: 0 0 24px; color: #1d1d1f; line-height: 1.6;">
                Hi ${firstName},
            </p>
            
            <p style="font-size: 16px; margin: 0 0 20px; color: #424245; line-height: 1.6;">
                Missed leads, slow responses, and after-hours drop-offs cost businesses customers every day. <strong>Rolto changes that.</strong>
            </p>
            
            <p style="font-size: 16px; margin: 0 0 20px; color: #424245; line-height: 1.6;">
                Rolto is more than just a chatbot — it's your all-in-one AI-powered assistant that works around the clock to:
            </p>
            
            <ul style="margin: 0 0 24px; padding-left: 24px; color: #424245;">
                <li style="margin-bottom: 16px; font-size: 16px; line-height: 1.6;">
                    <strong>Capture more leads</strong> while you focus on running your business
                </li>
                <li style="margin-bottom: 16px; font-size: 16px; line-height: 1.6;">
                    <strong>Answer visitor & client questions instantly</strong> — anytime, anywhere
                </li>
                <li style="margin-bottom: 16px; font-size: 16px; line-height: 1.6;">
                    <strong>Provide ongoing customer support</strong> without adding to your workload
                </li>
            </ul>
            
            <p style="font-size: 16px; margin: 0 0 30px; color: #424245; line-height: 1.6;">
                We're inviting our first wave of users in just a few weeks — and we'll be watching the waitlist closely. 🚀
            </p>
        </div>
        
        <!-- Referral Section -->
        <div class="mobile-referral-padding" style="margin: 0 40px 40px; background-color: #f8f9fa; border-radius: 12px; padding: 32px; text-align: center;">
            <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 16px; color: #1d1d1f;">
                Your Referral Information
            </h2>
            
            <p style="font-size: 16px; margin: 0 0 24px; color: #424245; line-height: 1.6;">
                As a waitlist member, you can share this referral link with your network.
            </p>
            
            <div style="background-color: #ffffff; border: 1px solid #d2d2d7; border-radius: 8px; padding: 20px; margin-bottom: 20px; text-align: center;">
                <p style="font-size: 13px; margin: 0 0 12px; color: #86868b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
                    Your Referral Link
                </p>
                
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px; background-color: #f8f9fa; padding: 16px; border-radius: 6px; border: 1px solid #e9ecef;">
                    <p style="font-size: 14px; margin: 0; color: #495057; font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace; word-break: break-all; line-height: 1.4; text-align: center; width: 100%;">
                        ${referralLink}
                    </p>
                </div>
            </div>
            
            <p style="font-size: 14px; margin: 0; color: #86868b; line-height: 1.5;">
                Share this link with friends, colleagues, or on social media
            </p>
        </div>
        
        <!-- Footer -->
        <div class="mobile-padding" style="text-align: center; color: #86868b; padding: 40px; border-top: 1px solid #f0f0f0;">
            <p style="font-size: 16px; margin: 0 0 16px; line-height: 1.6;">
                You'll receive important updates about your waitlist status and launch information.
            </p>
            
            <p style="font-size: 16px; margin: 0 0 24px; line-height: 1.6;">
                Thank you for joining our waitlist.
            </p>
            
            <p style="font-size: 16px; margin: 0; line-height: 1.6;">
                Let's make your website work harder for you.
            </p>
            
            <p style="font-size: 16px; margin: 24px 0 0; font-weight: 600; color: #1d1d1f;">
                — The Rolto Team
            </p>
        </div>
    </div>
    
    <script>
        // Copy functionality removed - link is now just for display
    </script>
</body>
</html>
  `;
}
