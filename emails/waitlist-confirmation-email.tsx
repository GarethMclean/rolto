import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WaitlistConfirmationEmailProps {
  firstName: string;
  referralCode: string;
  referralLink: string;
}

export const WaitlistConfirmationEmail = ({
  firstName,
  referralCode,
  referralLink,
}: WaitlistConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You're in 🎯 — Help us shape the future of customer engagement</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            We're building Rolto with you in mind
          </Heading>
          
          <Text style={text}>Hi {firstName},</Text>
          
          <Text style={text}>
            Missed leads, slow responses, and after-hours drop-offs cost businesses customers every day. Rolto changes that.
          </Text>
          
          <Text style={text}>
            Rolto is more than just a chatbot — it's your all-in-one AI-powered assistant that works around the clock to:
          </Text>
          
          <Text style={text}>
            • Capture more leads while you focus on running your business<br/>
            • Answer visitor & client questions instantly — anytime, anywhere<br/>
            • Provide ongoing customer support without adding to your workload
          </Text>
          
          <Text style={text}>
            We're inviting our first wave of users in just a few weeks — and we'll be watching the waitlist closely.
          </Text>
          
          <Text style={text}>
            🚀 Want to jump the line?<br/>
            Share Rolto with your network. Every referral gets you closer to early access (and unlocks special perks we've been saving for our early adopters).
          </Text>
          
          <Section style={buttonContainer}>
            <Button style={button} href={referralLink}>
              Unlock Early Access
            </Button>
          </Section>
          
          <Text style={text}>
            We'll be sending you behind-the-scenes updates and sneak peeks as we get ready for launch. Keep an eye on your inbox — the future of customer engagement is almost here.
          </Text>
          
          <Text style={text}>
            Let's make your website work harder for you.
          </Text>
          
          <Text style={text}>
            — The Rolto Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WaitlistConfirmationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#0070f3",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};
