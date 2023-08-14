import { NextApiRequest, NextApiResponse } from "next";
import { utapi } from "uploadthing/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const obj = {
    files: (await utapi.listFiles()).map((file) => file.key),
  }

  res.status(200).json(obj)
}