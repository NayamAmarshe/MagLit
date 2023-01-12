import { doc, getDoc } from "firebase/firestore";
import { StatusCodes } from "http-status-codes";
import { db } from "../../utils/firebase";

export default async function handler(req, res) {
  const { slug } = req.body;
  const collectionName =
    process.env.NODE_ENV === "production" ? "links" : "testLinks";

  try {
    // check firebase if slug exists
    const documentRef = doc(db, collectionName, slug);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      res.setHeader("Cache-Control", "s-maxage=176400");
      // return 401 if slug exists
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Slug already exists!" });
    } else {
      return res.status(StatusCodes.OK).json({
        message: "Slug is unique!",
      });
    }
  } catch (err) {
    console.log("Database Error", err);
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: "Database Error, Please try again..." });
  }
}
