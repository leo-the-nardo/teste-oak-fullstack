export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://localhost:8080"
    : "http://localhost:8080"
