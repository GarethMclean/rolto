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
          email: senderEmail,
        },
        to: [
          {
            email: email,
            name: firstName,
          },
        ],
        subject: "Welcome to Rolto - Waitlist Confirmation",
        htmlContent: generateEmailHTML(firstName, referralLink),
        // Additional headers to improve deliverability
        headers: {
          'X-Mailer': 'Rolto Waitlist System',
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          'Importance': 'Normal',
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
            .container { padding: 20px !important; }
            .mobile-text { font-size: 16px !important; }
            .mobile-heading { font-size: 24px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif; background-color: #ffffff; color: #1d1d1f; line-height: 1.5;">
    
    <!-- Hidden preview text - removed since we're controlling it with first visible text -->
    
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header - Simple and clean -->
        <div style="text-align: center; padding: 60px 40px 40px;">
            <h1 style="font-size: 36px; font-weight: 600; margin: 0 0 16px; color: #1d1d1f;">
                🎯 Welcome to Rolto!
            </h1>
            <p style="font-size: 18px; margin: 0; color: #86868b;">
                You're officially on our waitlist
            </p>
        </div>
        
        <!-- Main Content - Simple and clean -->
        <div style="padding: 0 40px 40px;">
            <p style="font-size: 18px; margin: 0 0 30px; color: #1d1d1f; line-height: 1.5;">
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
        
        <!-- Referral Section - Simple and clean -->
        <div style="margin: 0 40px 40px; background-color: #f8f9fa; border-radius: 12px; padding: 32px; text-align: center;">
            <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 16px; color: #1d1d1f;">
                Your Referral Information
            </h2>
            
            <p style="font-size: 16px; margin: 0 0 24px; color: #424245; line-height: 1.6;">
                As a waitlist member, you can share this referral link with your network.
            </p>
            
            <div style="background-color: #ffffff; border: 1px solid #d2d2d7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <p style="font-size: 13px; margin: 0 0 12px; color: #86868b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
                    Your Referral Link
                </p>
                
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px; background-color: #f8f9fa; padding: 16px; border-radius: 6px; border: 1px solid #e9ecef;">
                    <p style="font-size: 14px; margin: 0; color: #495057; font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace; word-break: break-all; line-height: 1.4; text-align: center; flex: 1;">
                        ${referralLink}
                    </p>
                    <button onclick="copyToClipboard('${referralLink}')" style="background: none; border: none; padding: 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s ease; min-width: 36px; min-height: 36px; flex-shrink: 0;" onmouseover="this.style.backgroundColor='#e9ecef'" onmouseout="this.style.backgroundColor='transparent'">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 3H4V16" stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 7H20V20H8V7Z" stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <p style="font-size: 14px; margin: 0; color: #86868b; line-height: 1.5;">
                Copy the link above and share it with friends, colleagues, or on social media
            </p>
        </div>
        
        <!-- Footer - Simple and clean -->
        <div style="text-align: center; color: #86868b; padding: 40px; border-top: 1px solid #f0f0f0;">
            <p style="font-size: 16px; margin: 0 0 16px; line-height: 1.6;">
                You'll receive important updates about your waitlist status and launch information.
            </p>
            
            <p style="font-size: 16px; margin: 0 0 24px; line-height: 1.6;">
                Thank you for joining our waitlist.
            </p>
            
            <p style="font-size: 16px; margin: 0; font-weight: 600; color: #1d1d1f;">
                — The Rolto Team
            </p>
        </div>
    </div>
    
    <script>
        function copyToClipboard(text) {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(function() {
                    showCopySuccess();
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showCopySuccess();
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }
                textArea.remove();
            }
        }
        
        function showCopySuccess() {
            // Simple visual feedback
            const button = event.target.closest('button');
            if (button) {
                const originalHTML = button.innerHTML;
                button.innerHTML = '✓';
                button.style.backgroundColor = '#28a745';
                button.style.color = 'white';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.backgroundColor = 'transparent';
                    button.style.color = 'inherit';
                }, 2000);
            }
        }
    </script>
</body>
</html>
  `;
}
