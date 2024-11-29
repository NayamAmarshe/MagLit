import { atom } from "jotai";

export const linksAtom = atom<
  {
    url: string;
    slug: string;
    password: string;
    createdAt: string;
  }[]
>([]);
