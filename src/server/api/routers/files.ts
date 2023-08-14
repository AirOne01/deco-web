import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { utapi } from "uploadthing/server";

export const filesRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async () => {
      return {
        files: await utapi.listFiles(),
      };
    }),
});
