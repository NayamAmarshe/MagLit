import { doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import CryptoJS from "crypto-js";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export interface CreateLinkRequest extends NextApiRequest {
  body: {
    slug: string;
    link: string;
    password: string;
  };
}

export type CreateLinkResponse = {
  status: string;
  message: string;
  maglitLink?: string;
  slug?: string;
};

const regex = /^(?:(http)s?|ftp|magnet):(?:\/\/[^\s/$.?#].[^\s]*|[^\s]*)$/;
const slugRegex = /^[a-z0-9](-?[a-z0-9])*$/;
const maliciousDomains = [
  ".eu.org",
  "nakula.fun",
  "ixg.llc",
  "datingflirt.click",
  "wahyucakep.org",
];

export default async function handler(
  req: CreateLinkRequest,
  res: NextApiResponse,
) {
  const { slug, link, password } = req.body;

  const apiKey = process.env.SAFE_BROWSING_API_KEY;

  if (!apiKey) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: "API not available" });
  }

  const collectionName =
    process.env.NODE_ENV === "production" ? "links" : "testLinks";

  const isValidLink = regex.exec(link);
  if (!isValidLink && link.length < 1 && !isValidLink[1]) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      slug,
      message:
        "Please make sure your link is valid & starts with http://, https://, ftp://, or magnet:",
    });
  }

  // check if slug is valid
  if (slug.length < 1 && !slugRegex.test(slug)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message:
        "Invalid alias! The alias should only contain lowercase alphabets, numbers and hyphen",
    });
  }

  if (maliciousDomains.some((domain) => link.includes(domain))) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: "error", message: "Malicious link entered!" });
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

      if (data && data?.matches?.length > 0) {
        // Handle error cases where the URL might not be checked by Safe Browsing
        res
          .status(401)
          .json({ status: "error", message: "Malicious link entered!" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Failed to check the URL." });
    }
  }

  try {
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

    return res.status(StatusCodes.OK).json({
      status: "success",
      message: "Link lit successfully",
      maglitLink: slug,
    });
  } catch (err) {
    console.log("Error", err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: "error", message: "Server Error, Please try again..." });
  }
}
