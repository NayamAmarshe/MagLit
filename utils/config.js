let BASE_URL;

if (process.env.BASE_URL) {
  BASE_URL = process.env.BASE_URL;
} else {
  BASE_URL = "http://localhost:3000/";
}

export { BASE_URL };
