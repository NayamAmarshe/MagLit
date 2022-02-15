import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";
import { db } from "../../utils/firebase";
const regex =
  /(magnet:\?xt=urn:btih:[a-zA-Z0-9]*)|(^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$)/;

export default async function handler(req, res) {
  const { slug, link, password } = req.body;
  const collectionName =
    process.env.NODE_ENV === "production" ? "links" : "testLinks";

  if (link.length < 1) {
    return res
      .status(400)
      .json({ slug, message: "You entered an invalid link" });
  }

  try {
    // check if link is valid
    if (!regex.test(link)) {
      return res
        .status(400)
        .json({ slug, message: "Please enter a valid link" });
    }

    // check firebase if slug exists
    const documentRef = doc(db, collectionName, slug);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      // return 401 if slug exists
      return res.status(403).json({ message: "Slug already exists" });
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

      return res.status(200).json({
        message: "Link lit successfully",
        maglitLink: slug,
      });
    }
  } catch (err) {
    console.log("Database Error", err);
    throw err;
  }
}
