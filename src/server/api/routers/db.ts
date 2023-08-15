import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { connect } from '@planetscale/database'

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

const conn = connect(config)

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
    }))
    .mutation(async ({ input }) => {
      console.log("MUTATION");
      const tags = input.tags.join(";")
      const results = await conn.execute('update heads set heads_name = ?, heads_key = ?, heads_tags = ? where heads_id = ?', [input.name, input.key, tags, input.id])
      console.log(JSON.stringify(results));

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
