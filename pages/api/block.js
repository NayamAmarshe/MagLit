import { doc, updateDoc, getDoc } from "firebase/firestore";
import { StatusCodes } from "http-status-codes";
import { db } from "../../utils/firebase";

export default async function handler(req, res) {
  const { slug, authKey } = req.body;

  // IF AUTH_KEY IS WRONG, RETURN 403
  if (!authKey || authKey !== process.env.AUTH_KEY) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Wrong Authorization Link!" });
  }

  const collectionName = "links";

  try {
    if (slug.includes("maglit.me")) {
      slug.replace("maglit.me/", "");
    }
    // check firebase if slug exists
    const documentRef = doc(db, collectionName, slug);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      // CHECK IF THE LINK IS ALREADY BLOCKED
      if (documentSnapshot.data().blocked) {
        return res
          .status(StatusCodes.LOCKED)
          .json({ message: "Already blocked!", slug });
      }

      // BLOCK THE LINK IF NOT ALREADY
      await updateDoc(documentRef, {
        blocked: true,
      });

      //SET CACHE
      res.setHeader("Cache-Control", "s-maxage=86400");

      // RETURN 200
      return res
        .status(StatusCodes.OK)
        .json({ message: "Blocked Link Successfully!", slug });
    } else {
      // RETURN 403
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Couldn't find link",
        maglitLink: slug,
      });
    }
  } catch (err) {
    console.log("Error", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Network Error, Please try again..." });
  }
}
