export const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://vendor.garisea.com"
    : process.env.VERCEL_ENV === "preview"
    ? "https://staging-vendor.garisea.com"
    : "http://localhost:3000";
