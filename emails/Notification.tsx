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

export const Notification = ({
  url = "#",
  name = "JohnDoe",
}: {
  url: string;
  name: string;
}) => (
  <Html>
    <Head />
    <Preview>You have a new message</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/images/logos/garisea/logo-green-dark.png`}
            width="142"
            height="auto"
            alt="Garisea"
          />
        </Section>
        <Heading style={h2}>
          Hello {name}! You have a new message on Garisea.
        </Heading>
        <Text style={text}>
          Click on the link below to read your new messages.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>
            <Link href={url}>Go To Message</Link>
          </Text>
        </Section>

        <Text style={text2}>
          If you didn't request this email, there's nothing to worry about - you
          can safely ignore it.
        </Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: "66%" }}>
              <Img
                src={`${baseUrl}/images/logos/garisea/logo-green-dark.png`}
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
                      src={`${baseUrl}/images/logos/twitter-x.png`}
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
                      src={`${baseUrl}/images/logos/facebook.png`}
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
                      src={`${baseUrl}/images/logos/instagram.png`}
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
            Marketplace
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://garisea.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://garisea.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </Link>
          <Text style={footerText}>
            ©{new Date().getFullYear()} Garisea, a Francton Ltd company.
            <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default Notification;

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
  fontSize: "21px",
  fontWeight: "500",
  margin: "30px 0",
  padding: "0",
  lineHeight: "28px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginRight: "50px",
  marginBottom: "30px",
  padding: "18px 13px",
};

const confirmationCodeText = {
  fontSize: "20px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};

const text2 = {
  color: "#000",
  fontSize: "11px",
  lineHeight: "20px",
  opacity: "0.6",
};
