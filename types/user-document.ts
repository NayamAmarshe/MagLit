import { Timestamp } from "firebase/firestore";

export type UserDocument = {
  uid: string;
  email: string;
  photoURL: string | undefined;
  name: string;
  createdAt: string;
  updatedAt: string;
  subscription?: {
    planDuration?: "monthly" | "yearly";
    subscriptionId: string;
    status: "ACTIVE" | "INACTIVE" | "CREATED";
    startPaymentTime: Timestamp | null;
    lastPaymentTime: Timestamp | null;
    nextPaymentTime: Timestamp | null;
    planId: string;
  };
};
