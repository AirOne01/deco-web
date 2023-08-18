import { ExecutedQuery } from "@planetscale/database";
import { z } from "zod";
import { conn } from "~/planetscale";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const dbRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const results = await conn.execute('select * from heads where heads_id = ?', [input])

      return {
        results,
      };
    }),
  getAll: publicProcedure
    .query(async () => {
      const results = await conn.execute('select * from heads', [1])

      return {
        results,
      };
    }),
  insert: publicProcedure
    .input(z.object({
      name: z.string(),
      key: z.string(),
    }))
    .mutation(async ({ input }) => {
      const results = await conn.execute('insert into heads (heads_name, heads_key) values (?, ?)', [input.name, input.key])

      return {
        results,
      };
    }),
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string(),
      key: z.string(),
      tags: z.array(z.string()),
      actionType: z.enum(["INSERT", "UPDATE"]),
    }))
    .mutation(async ({ input }) => {
      const tags = input.tags.join(";")

      let results: ExecutedQuery;

      if (input.actionType === "INSERT") {
        results = await conn.execute('insert into heads (heads_name, heads_key, heads_tags) values (?, ?, ?)', [input.name, input.key, tags])
      } else {
        results = await conn.execute('update heads set heads_name = ?, heads_key = ?, heads_tags = ? where heads_id = ?', [input.name, input.key, tags, input.id])
      }

      return {
        results,
      };
    }),
  tags: publicProcedure
    .query(async () => {
      const results = await conn.execute('select * from heads_tags', [1])

      return {
        results,
      };
    }),
});
