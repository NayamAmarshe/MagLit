let BASE_URL;

if (process.env.NEXT_PUBLIC_BASE_URL) {
  BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
} else {
  BASE_URL = "http://localhost:3000/";
}

export { BASE_URL };
