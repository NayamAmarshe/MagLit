import { doc, getDoc } from "firebase/firestore";
import { StatusCodes } from "http-status-codes";
import { db } from "../../utils/firebase";
import crypto from "crypto-js";

export default async function handler(req, res) {
  const { slug, password } = req.body;
  const collectionName =
    process.env.NODE_ENV === "production" ? "links" : "testLinks";

  if (slug.length < 1) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Link doesn't exist" });
  }

  try {
    // check firebase if slug exists
    const documentRef = doc(db, collectionName, slug);
    const documentSnapshot = await getDoc(documentRef);

    if (!documentSnapshot.exists()) {
      // return 404 if slug doesn't exist
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Link doesn't exist",
        linkData: {
          link: "",
          protected: false,
        },
      });
    } else {
      // get link details
      const linkData = documentSnapshot.data();
      const { link } = linkData;
      const isProtected = linkData.protected;
      let isBlocked = false;
      isBlocked = linkData?.blocked;

      let decryptedLink = "";

      if (isBlocked === true) {
        res.setHeader("Cache-Control", "s-maxage=31536000, immutable");
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Link doesn't exist",
          linkData: {
            link: "",
            protected: false,
          },
        });
      }

      // set passwords
      const withPassword = process.env.SECRET_KEY + password;
      const withoutPassword = process.env.SECRET_KEY;

      try {
        decryptedLink = crypto.AES.decrypt(
          link,
          isProtected ? withPassword : withoutPassword,
        ).toString(crypto.enc.Utf8);
      } catch (error) {
        console.warn("Error decrypting, possibly wrong password");
      }

      // check protected link
      if (decryptedLink.length < 1) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Wrong Password!",
          linkData: {
            ...linkData,
            link: "",
          },
        });
      }

      // if password is correct
      res.setHeader("Cache-Control", "s-maxage=176400");
      return res.status(StatusCodes.OK).json({
        message: "Link found!",
        linkData: JSON.parse(decryptedLink),
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Network Error, Please try again..." });
  }
}
