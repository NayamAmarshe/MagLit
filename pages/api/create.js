import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CryptoJS from "crypto-js";
import { StatusCodes } from "http-status-codes";

const regex =
  /^(https?|ftp|magnet):(?:\/\/[^\s/$.?#].[^\s]*|[^\s]*)$/;

const slugRegex = /^[a-z0-9](-?[a-z0-9])*$/;

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
    process.env.NODE_ENV === "production" ? "links" : "testLinks";

  // check if link is valid
  if (link.length < 1) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ slug, message: "You entered an invalid link" });
  }

  if (!regex.test(link)) {
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

  if (link.includes(".eu.org")) {
    return res.status(401).json({ message: "Malicious link entered!" });
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
