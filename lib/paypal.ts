import { loadScript } from "@paypal/paypal-js";

export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

export const loadPayPalScript = async () => {
  try {
    return await loadScript({
      clientId: PAYPAL_CLIENT_ID,
      currency: "USD",
      intent: "subscription",
      vault: true,
    });
  } catch (error) {
    console.error("Failed to load PayPal script:", error);
    throw error;
  }
};

export const SUBSCRIPTION_PLANS = {
  PREMIUM: {
    planId: "P-1SE56933PV123450VM5FLEBA",
    name: "Premium",
    price: "9.99",
  },
} as const;
