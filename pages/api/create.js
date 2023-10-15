import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { slugRegex } from "../../utils/regex";
import CryptoJS from "crypto-js";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
  const { slug, link, password } = req.body;

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
        "Please make sure your link starts with http:// or https:// or magnet://",
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

  try {
    // check firebase if slug exists
    const documentRef = doc(db, collectionName, slug);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      // return 401 if slug exists
      res.setHeader("Cache-Control", "s-maxage=176400");
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Slug already exists" });
    } else {
      // create a new link
      const encryptedLink = CryptoJS.AES.encrypt(
        JSON.stringify({ link }),
        password === ""
          ? process.env.SECRET_KEY
          : process.env.SECRET_KEY + password
      ).toString();

      const docRef = setDoc(doc(collection(db, collectionName), slug), {
        link: encryptedLink,
        slug: slug,
        protected: !(password === ""),
      });

      res.setHeader("Cache-Control", "s-maxage=176400");
      return res.status(StatusCodes.OK).json({
        message: "Link lit successfully",
        maglitLink: slug,
      });
    }
  } catch (err) {
    console.log("Error", err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Network Error, Please try again..." });
  }
}
