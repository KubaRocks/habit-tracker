import { createRouter } from "./context";
import { z } from "zod";

export const habitRouter = createRouter()
  .query("getBySlug", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      const habit = await ctx.prisma.habit.findUnique({
        where: { slug: input.slug },
        include: { logs: true },
      });
      return { habit };
    },
  })
  .mutation("track", {
    input: z.object({
      habitId: z.string(),
      participatedAt: z.date(),
    }),
    async resolve({ input, ctx }) {
      const trackLog = await ctx.prisma.trackLog.create({
        data: {
          habitId: input.habitId,
          participatedAt: input.participatedAt,
        },
      });

      return { trackLog };
    },
  });
