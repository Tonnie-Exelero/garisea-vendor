import * as React from "react";
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { baseUrl } from "@src/configs/baseUrl";

export const PasswordReset = ({
  url = "#",
  name = "JohnDoe",
}: {
  url: string;
  name: string;
}) => (
  <Html>
    <Head />
    <Preview>Reset Password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/static/logo-green-dark.svg`}
            width="142"
            height="auto"
            alt="Garisea"
          />
        </Section>
        <Heading style={h2}>Hello {name},</Heading>
        <Text style={heroText}>
          Follow the link below to reset your password.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>
            <Link href={url}>Reset Link</Link>
          </Text>
        </Section>

        <Text style={text}>The link above is valid for 24 hours.</Text>

        <Text style={text}>
          If you didn't request this email, there's nothing to worry about - you
          can safely ignore it.
        </Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: "66%" }}>
              <Img
                src={`${baseUrl}/static/logo-green-dark.svg`}
                width="142"
                height="auto"
                alt="Garisea"
              />
            </Column>
            <Column>
              <Row>
                <Column>
                  <Link href="https://twitter.com/Gari_sea" target="_blank">
                    <Img
                      src={`${baseUrl}/static/x.svg`}
                      width="32"
                      height="32"
                      alt="Garisea"
                      style={socialMediaIcon}
                    />
                  </Link>
                </Column>
                <Column>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61550932202109&mibextid=ZbWKwL"
                    target="_blank"
                  >
                    <Img
                      src={`${baseUrl}/static/facebook.svg`}
                      width="32"
                      height="32"
                      alt="Garisea"
                      style={socialMediaIcon}
                    />
                  </Link>
                </Column>
                <Column>
                  <Link href="https://instagram.com/gari_sea" target="_blank">
                    <Img
                      src={`${baseUrl}/static/instagram.svg`}
                      width="32"
                      height="32"
                      alt="Garisea"
                      style={socialMediaIcon}
                    />
                  </Link>
                </Column>
              </Row>
            </Column>
          </Row>
        </Section>

        <Section>
          <Link
            style={footerLink}
            href="https://garisea.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our shop
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://garisea.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Policies
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://garisea.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Help center
          </Link>
          <Text style={footerText}>
            ©2023 Garisea, a Francton Ltd company.
            <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PasswordReset;

const footerText = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left" as const,
  marginBottom: "50px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "32px",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
};

const logoContainer = {
  marginTop: "32px",
};

const h2 = {
  color: "#1d1c1d",
  fontSize: "26px",
  fontWeight: "500",
  margin: "30px 0",
  padding: "0",
  lineHeight: "36px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginRight: "50px",
  marginBottom: "30px",
  padding: "43px 23px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
