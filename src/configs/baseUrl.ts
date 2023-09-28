export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://vendor.garisea.com"
    : process.env.NODE_ENV === "test"
    ? "https://staging-vendor.garisea.com"
    : "http://localhost:3000";
