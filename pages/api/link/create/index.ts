import { NextApiRequest, NextApiResponse } from "next";
import { googleSafeBrowsingCheck } from "./safe-browsing";
import { encryptUrl } from "./encrypt-url";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Monkey from "monkey-typewriter";

export interface CreateLinkRequest extends NextApiRequest {
  body: {
    slug: string;
    url: string;
    password: string;
    userId?: string;
  };
}
export type CreateLinkResponse = {
  status: string;
  message: string;
  generatedLink?: string;
  slug?: string;
  userId?: string;
};

export default async function handler(
  req: CreateLinkRequest,
  res: NextApiResponse<CreateLinkResponse>,
) {
  const { url, password, userId } = req.body;
  let slug = req.body.slug || "";
  console.log("🚀 => url:", url);
  console.log("🚀 => password:", password);
  console.log("🚀 => slug:", slug);

  if (!url) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  const urlRegex = /^(https?:\/\/|ftp:\/\/|magnet:\?).+/i;
  if (!urlRegex.test(url)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid URL",
    });
  }

  // GOOGLE SAFE BROWSING CHECK
  try {
    await googleSafeBrowsingCheck(url);
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: error.message,
    });
  }

  try {
    if ((slug && !userId) || !slug) {
      slug = Monkey.word();
    }
    const isProtected = !!password;
    let encryptedUrl = url;
    if (password) {
      const encryptUrlResponse = await encryptUrl(url, password);
      encryptedUrl = btoa(String.fromCharCode(...encryptUrlResponse));
    }
    const forwarded = req.headers["x-forwarded-for"];
    // Store IP Address of potential scammers
    const ip = forwarded
      ? (forwarded as string).split(/, /)[0]
      : req.socket.remoteAddress;
    const setDocPromises = [
      setDoc(doc(db, `new-links/${slug}`), {
        link: isProtected ? encryptedUrl : url,
        slug: slug,
        isProtected: isProtected,
        ...(userId && { userId: userId }), // Store user ID if available
        ...(!userId && ip && { ip: ip }), // Store IP address if not logged in
        createdAt: new Date().toISOString(),
      }),
    ];

    if (userId) {
      setDocPromises.push(
        setDoc(doc(db, `users/${userId}/links/${slug}`), {
          createdAt: new Date().toISOString(),
          slug: slug,
        }),
      );
    }

    await Promise.all(setDocPromises);

    return res.status(200).json({
      status: "success",
      message: "Link created successfully",
      generatedLink: `https://thiss.link/${slug}`,
      slug: slug,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong, please try again",
    });
  }
}
