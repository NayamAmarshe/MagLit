const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
console.log("🚀 => PAYPAL_CLIENT_ID:", PAYPAL_CLIENT_ID);

const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
console.log("🚀 => PAYPAL_CLIENT_SECRET:", PAYPAL_CLIENT_SECRET);

const base = process.env.PAYPAL_BASE_URL;

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
export const generateAccessToken = async () => {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("MISSING_API_CREDENTIALS");
  }
  try {
    const auth = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
    ).toString("base64");
    console.log("🚀 => auth:", auth);

    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    console.log("🚀 => data:", data);

    return data.access_token as string;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    throw new Error("Failed to authenticate with PayPal");
  }
};
