// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { habitRouter } from "./habit";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("habit.", habitRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
