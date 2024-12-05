import { db } from "@/lib/firebase";
import { UserDocument } from "@/types/user-document";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export interface CreateUserRequest extends NextApiRequest {
  body: {
    user?: User;
  };
}
export type CreateUserResponse = {
  status: "success" | "error";
  message: string;
};

export default async function handler(
  req: CreateUserRequest,
  res: NextApiResponse<CreateUserResponse>,
) {
  const { user } = req.body;
  console.log("🚀 => user:", user);

  if (!user?.uid) {
    console.error("No user found");
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  // Check if the user already exists in the database
  try {
    const userDoc = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDoc);
    if (userDocSnapshot.exists()) {
      console.log("User already exists");
      return res.status(200).json({
        status: "success",
        message: "User already exists",
      });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return res.status(500).json({
      status: "error",
      message: "Error checking user existence",
    });
  }

  try {
    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, {
      createdAt: new Date().toISOString(),
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      uid: user?.uid,
    } as UserDocument);
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      status: "error",
      message: "Error creating user",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "User created successfully",
  });
}
