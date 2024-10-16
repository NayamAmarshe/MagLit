import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CryptoJS from "crypto-js";
import { StatusCodes } from "http-status-codes";

const regex = /^(?:(http)s?|ftp|magnet):(?:\/\/[^\s/$.?#].[^\s]*|[^\s]*)$/;

const slugRegex = /^[a-z0-9](-?[a-z0-9])*$/;

const MAX_REDIRECTS = 2; // Maximum allowed redirects

// Helper function to check JavaScript-based or meta redirects in page content
function checkForJSRedirect(content) {
  const jsRedirectRegex = /window\.location\.href\s*=\s*['"]([^'"]+)['"]/;
  const metaRedirectRegex =
    /<meta[^>]+http-equiv=["']refresh["'][^>]+url=([^'"]+)/i;

  const jsMatch = content.match(jsRedirectRegex);
  const metaMatch = content.match(metaRedirectRegex);

  if (jsMatch && jsMatch[1]) {
    return jsMatch[1];
  }

  if (metaMatch && metaMatch[1]) {
    return metaMatch[1];
  }

  return null;
}

async function fetchWithRedirects(url, maxRedirects) {
  let currentUrl = url;
  console.log("🚀 => currentUrl:", currentUrl);

  let redirectCount = 0;
  console.log("🚀 => redirectCount:", redirectCount);

  while (redirectCount < maxRedirects) {
    const response = await fetch(currentUrl, {
      redirect: "follow", // Follow redirects
    });

    if (response.redirected && response.url !== currentUrl) {
      // Check if the response was a redirect
      currentUrl = response.url;
      redirectCount++;
      console.log(`HTTP Redirect ${redirectCount} to: ${currentUrl}`);
      // const redirectCount = response.url;
      // console.log("🚀 => redirectCount:", redirectCount);
      // if (redirectCount > MAX_REDIRECTS) {
      //   return res.status(StatusCodes.BAD_REQUEST).json({
      //     slug,
      //     message: "Link has too many redirects and may be suspicious.",
      //   });
      // } else {
      //   break;
      // }
    } else {
      // No HTTP redirect, return the response to check page content
      const pageContent = await response.text();
      console.log("🚀 => pageContent:", pageContent);

      const jsRedirect = checkForJSRedirect(pageContent);
      console.log("🚀 => jsRedirect:", jsRedirect);

      if (jsRedirect) {
        redirectCount++;
        console.log(`JS Redirect ${redirectCount} to: ${currentUrl}`);
      } else {
        // No further redirects, return the final response
        return { response, redirectCount };
      }
    }
  }

  // Return the final response after redirect threshold or no more redirects
  return { response: await fetch(currentUrl), redirectCount };
}

export default async function handler(req, res) {
  const { slug, link, password } = req.body;
  console.log("🚀 => body:", req.body);

  const apiKey = process.env.SAFE_BROWSING_API_KEY;

  if (!apiKey) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "API not available" });
  }

  const collectionName =
      process.env.NODE_ENV === "production" ? "links" : "testLinks",
    URI = regex.exec(link);

  // check if link is valid
  if (link.length < 1) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ slug, message: "You entered an invalid link" });
  }

  if (URI === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      slug,
      message:
        "Please make sure your link starts with http://, https://, ftp://, or magnet:",
    });
  }

  // check if slug is valid
  if (slug.length < 1) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid Slug!" });
  }

  if (!slugRegex.test(slug)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message:
        "The slug should only contain lowercase alphabets, numbers and hyphen",
    });
  }

  if (link.includes(".eu.org") || link.includes("nakula.fun")) {
    return res.status(401).json({ message: "Malicious link entered!" });
  }

  if (URI[1]) {
    // Redirection check
    try {
      // Step 1: Check for HTTP redirects using fetch
      const { response, redirectCount } = await fetchWithRedirects(
        link,
        MAX_REDIRECTS,
      );

      if (redirectCount >= MAX_REDIRECTS) {
        return res.status(400).json({
          message: `Suspcious URL detected. If this is a valid URL, please report this issue.`,
        });
      }
    } catch (error) {
      console.error("Error checking link:", error);
      return res.status(500).json({
        message: "Error checking the link.",
      });
    }

    if (process.env.SKIP_SAFE_BROWSING === "true") {
      console.log("Skipping safe browsing check");
    } else {
      try {
        const response = await fetch(
          "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" +
            apiKey,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client: {
                clientId: "maglit-website",
                clientVersion: "1.0.0",
              },
              threatInfo: {
                threatTypes: [
                  "MALWARE",
                  "SOCIAL_ENGINEERING",
                  "UNWANTED_SOFTWARE",
                  "POTENTIALLY_HARMFUL_APPLICATION",
                ],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [{ url: `${link}` }],
              },
            }),
          },
        );

        const data = await response.json();
        console.log("🚀 => data:", data);

        if (data && data?.matches?.length > 0) {
          // Handle error cases where the URL might not be checked by Safe Browsing
          res.status(401).json({ message: "Malicious link entered!" });
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to check the URL." });
      }
    }
  }

  try {
    // create a new link
    if (!process.env.SECRET_KEY) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Server error..." });
    }
    const encryptedLink = CryptoJS.AES.encrypt(
      JSON.stringify({ link }),
      password === ""
        ? process.env.SECRET_KEY
        : process.env.SECRET_KEY + password,
    ).toString();

    await setDoc(doc(db, collectionName, slug), {
      link: encryptedLink,
      slug: slug,
      protected: !(password === ""),
    });

    res.setHeader("Cache-Control", "s-maxage=176400");
    return res.status(StatusCodes.OK).json({
      message: "Link lit successfully",
      maglitLink: slug,
    });
  } catch (err) {
    console.log("Error", err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Server Error, Please try again..." });
  }
}
