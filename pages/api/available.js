import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default async function handler(req, res) {
  const { slug } = req.body;
  console.log("🚀 => handler => slug", slug);
  const collectionName =
    process.env.NODE_ENV === "production" ? "links" : "testLinks";

  try {
    // check firebase if slug exists
    const documentRef = doc(db, collectionName, slug);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      // return 401 if slug exists
      return res.status(403).json({ message: "Slug already exists!" });
    } else {
      return res.status(200).json({
        message: "Slug is unique!",
      });
    }
  } catch (err) {
    console.log("Database Error", err);
    throw err;
  }
}
