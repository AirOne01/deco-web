import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { conn } from "~/planetscale";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rows } = await conn.execute("SELECT heads_key FROM heads")
  const valid = z.array(z.object({ heads_key: z.string() })).parse(rows)
  const cleaned = valid.map((e) => e.heads_key)

  res.status(200).json({
    heads: cleaned
  })
}