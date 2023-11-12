import * as React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
} from "@react-email/components";
import { baseUrl } from "@src/configs/baseUrl";

const tips = [
  {
    id: 1,
    description:
      "When creating your account, the Store Link you entered is going to be your permanent shop link on Garisea. So you can be sharing this link with your customers to see your vehicle listings",
  },
  {
    id: 2,
    description:
      "Images sell. Use Good Quality photos to sell your vehicles faster",
  },
  {
    id: 3,
    description:
      "The more information about a vehicle you enter, the higher value your listing gets, and the easier you make it for the customer to make a decision on purchasing your vehicle",
  },
  {
    id: 4,
    description:
      "Ensure the contact information you provided is up-to-date and active, because customers will use it to contact you",
  },
  {
    id: 5,
    description:
      "At Garisea, we don't participate in the buyer/seller negotiations, and we don't charge any commission from a successful purchase",
  },
];

export const VendorWelcome = () => (
  <Html>
    <Head />
    <Preview>Garisea startup and tips</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logo}>
          <Img
            src={`${baseUrl}/images/logos/garisea/logo-green-dark.png`}
            width={146}
            alt="Garisea"
          />
        </Section>
        <Row style={header}>
          <Column style={headerContent}>
            <Heading style={headerContentTitle}>
              Sell your cars better and faster
            </Heading>
            <Text style={headerContentSubtitle}>
              Setup and tips for selling better on Garisea
            </Text>
          </Column>
          <Column style={headerImageContainer}>
            <Img
              width={340}
              height={120}
              src={`${baseUrl}/static/car.png`}
              alt="Garisea"
              style={{ objectFit: "cover" }}
            />
          </Column>
        </Row>

        <Section style={content}>
          <Heading as="h2" style={title}>
            What is Garisea? And why?
          </Heading>
          <Text style={paragraph}>
            With millions of car buyers and thousands of car sellers, there's
            quite a large market ready to consume. Garisea is an advanced
            vehicle marketplace primarily focused on making the car selling
            process smarter through a ton of curated solutions, value-adding
            analytics, and AI-based car buyer acquisition for you as a car
            seller. Basically, we help you get ideal customers.
          </Text>
          <Text style={paragraph}>
            Using Garisea is absolutely <strong>FREE</strong>. So why not use
            it?
          </Text>

          <Hr style={divider} />

          <Heading as="h2" style={title}>
            Be a smart seller with Garisea
          </Heading>
          <Text style={paragraph}>
            Here are a few simple tips and nitpicks to get you started:
          </Text>
          <ul>
            {tips?.map((tip) => (
              <li key={tip.id}>
                <Text style={paragraph}>{tip.description}</Text>
              </li>
            ))}
          </ul>

          <Text style={paragraph}>
            With our <strong>powerful and AI-based</strong> curated search
            engine, customers will be able to get the exact vehicles they're
            looking for, faster. Ensure you enter all information available
            about your vehicles to make the process better, and sell faster.
          </Text>

          <Hr style={divider} />

          <Heading as="h2" style={title}>
            List your vehicles
          </Heading>

          <Text style={paragraph}>
            1. Login to your Garisea Vendor account at{" "}
            <Link href="https://vendor.garisea.com/login" target="_blank">
              https://vendor.garisea.com/login
            </Link>
          </Text>

          <Text style={paragraph}>2. Go to Vehicles page</Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step1.png`}
            alt="Vehicle listing step 1"
          />

          <Text style={paragraph}>
            3. Click on <strong>Add</strong> to add a vehicle listing
          </Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step2.png`}
            alt="Vehicle listing step 2"
          />

          <Text style={paragraph}>
            4. Select a Brand and an associated Model from the dropdowns.
            <br />
            <br />
            If your vehicle brand doesn't exist, click on{" "}
            <strong>Add Brand (3.)</strong> to create it. Then click the{" "}
            <strong>Refresh icon (4.)</strong> to populate the new brand in the
            dropdown list.
            <br />
            <br />
            If your vehicle model associated with the brand selected doesn't
            exist, click on <strong>Add Model (5.)</strong> to create it. Then
            click the <strong>Refresh icon (6.)</strong> to populate the new
            model in the dropdown list.
          </Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step3.png`}
            alt="Vehicle listing step 3"
          />

          <Text style={paragraph}>
            5. Once vehicle Basic information has been added, verify it's
            correct then click on the <strong>Confirm Data</strong> button to
            confirm then move to the next step.
          </Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step4.png`}
            alt="Vehicle listing step 4"
          />

          <Text style={paragraph}>
            6. Select <strong>Good Quality</strong> images to add, then click{" "}
            <strong>Upload Files</strong> button to upload the images for your
            new listing.
          </Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step5.png`}
            alt="Vehicle listing step 5"
          />

          <Text style={paragraph}>
            7. After confirming that all the information is entered correctly,
            in the last step, click on <strong>Submit</strong> button to create
            your listing.
          </Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step6.png`}
            alt="Vehicle listing step 6"
          />

          <Text style={paragraph}>
            8. <strong>Congratulations!</strong> You've created your first
            listing. Now click on <strong>Basic Details</strong> to create other
            listings.
          </Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step7.png`}
            alt="Vehicle listing step 7"
          />

          <Hr style={divider} />

          <Heading as="h2" style={title}>
            Manage a listing
          </Heading>

          <Text style={paragraph}>
            1. Once you've created your listings, you can manage individual
            listings from the <strong>Vehicles List</strong> page.
            <br />
            <br />
            To view the listings, use the Search Filters section to fetch them.
            For instance, if you have <strong>Bentley</strong> listings, under
            the Brand dropdown, select <strong>Bentley</strong>, then optionally
            select more filters to add more precision. Click the{" "}
            <strong>Search</strong> button to fetch the listings.
          </Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step8.png`}
            alt="Vehicle listing step 8"
          />

          <Text style={paragraph}>
            2. From the listings results, if you need to manage a specific
            listing, click on the listing name to open it up.
          </Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step9.png`}
            alt="Vehicle listing step 9"
          />

          <Text style={paragraph}>
            3. To view and manage images, click on the image (
            <strong>1.</strong>).
            <br />
            <br />
            To manage Reserved or Sold status, or edit the basic details of the
            listing, click on the respective button in the Basic Details section
            (<strong>2.</strong>).
            <br />
            <br />
            To edit more vehicle information, use the <strong>
              Edit (3.)
            </strong>{" "}
            buttons under the Specifications or Extra Info sections.
          </Text>
          <Img
            width={"100%"}
            src={`${baseUrl}/static/listings/step10.png`}
            alt="Vehicle listing step 10"
          />

          <Hr style={divider} />

          <Text style={paragraph}>
            You're now ready to begin managing your vehicle listings on Garisea.
          </Text>

          <Section style={buttonContainer}>
            <Link style={button} href="https://vendor.garisea.com/login">
              Go to Dashboard
            </Link>
          </Section>
        </Section>
      </Container>

      <Section style={footer}>
        <Row style={footerLogos}>
          <Column style={{ width: "66%" }}>
            <Img
              src={`${baseUrl}/images/logos/garisea/logo-green-dark.png`}
              width="122"
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
        <Row>
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
            <br />©{new Date().getFullYear()} Garisea, a Francton Ltd company.
            <br />
            <br />
            All rights reserved.
          </Text>
        </Row>
      </Section>
    </Body>
  </Html>
);

export default VendorWelcome;

const main = {
  backgroundColor: "#f3f3f5",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const headerContent = { padding: "20px 30px 15px" };

const headerContentTitle = {
  color: "#fff",
  fontSize: "27px",
  fontWeight: "bold",
  lineHeight: "27px",
};

const headerContentSubtitle = {
  color: "#fff",
  fontSize: "17px",
};

const headerImageContainer = {
  padding: "30px 10px",
};

const title = {
  margin: "0 0 15px",
  fontWeight: "bold",
  fontSize: "21px",
  lineHeight: "21px",
  color: "#0c0d0e",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "21px",
  color: "#3c3f44",
};

const divider = {
  margin: "30px 0",
};

const container = {
  maxWidth: "760px",
  width: "100%",
  margin: "30px auto 0 auto",
  backgroundColor: "#ffffff",
};

const footer = {
  width: "760px",
  margin: "32px auto",
  padding: "0 30px 30px",
};

const content = {
  padding: "30px 30px 40px 30px",
};

const logo = {
  display: "flex",
  background: "#f3f3f5",
  padding: "20px 30px",
};

const header = {
  borderRadius: "5px 5px 0 0",
  display: "flex",
  flexDireciont: "column",
  backgroundColor: "#2b2d6e",
};

const buttonContainer = {
  marginTop: "24px",
  display: "block",
};

const button = {
  backgroundColor: "#0095ff",
  border: "1px solid #0077cc",
  fontSize: "17px",
  lineHeight: "17px",
  padding: "13px 17px",
  borderRadius: "4px",
  maxWidth: "120px",
  color: "#fff",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const footerText = {
  fontSize: "12px",
  lineHeight: "15px",
  color: "#9199a1",
  margin: "0",
};

const footerLink = {
  display: "inline-block",
  color: "#9199a1",
  textDecoration: "underline",
  fontSize: "12px",
  marginRight: "10px",
  marginBottom: "0",
  marginTop: "8px",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "32px",
};
