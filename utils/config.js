const env = process.env.NODE_ENV;
let BASE_URL;

if (env == "development") {
  BASE_URL = "http://localhost:3000";
} else if (env == "production") {
  BASE_URL = "https://maglit.me";
}

export { BASE_URL };
