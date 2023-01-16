import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const env = process.env.NODE_ENV;

const getBaseUrl = () => {
  if (env == "development") {
    return "http://localhost:3000";
  } else if (env == "production") {
    return publicRuntimeConfig.app.baseUrl;
  }  
}

export { getBaseUrl };
