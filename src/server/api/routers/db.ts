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
      image: z.string(),
    }))
    .mutation(async ({ input }) => {
      const results = await conn.execute('insert into heads (name, image) values (?, ?)', [input.name, input.image])

      return {
        results,
      };
    }),
});
