import { dbRouter } from "~/server/api/routers/db";
import { filesRouter } from "~/server/api/routers/files";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  db: dbRouter,
  files: filesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
