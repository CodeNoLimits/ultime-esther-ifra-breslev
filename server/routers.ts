import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  books: router({
    // Get all books
    getAll: publicProcedure.query(async () => {
      return await db.getAllBooks();
    }),

    // Get featured books for homepage
    getFeatured: publicProcedure.query(async () => {
      return await db.getFeaturedBooks();
    }),

    // Get book by slug
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getBookBySlug(input.slug);
      }),

    // Get filtered books
    getFiltered: publicProcedure
      .input(
        z.object({
          type: z.array(z.string()).optional(),
          language: z.array(z.string()).optional(),
          categoryId: z.array(z.number()).optional(),
          priceMin: z.number().optional(),
          priceMax: z.number().optional(),
          author: z.array(z.string()).optional(),
          sortBy: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        const { sortBy, ...filters } = input;
        return await db.getFilteredBooks(filters, sortBy);
      }),
  }),

  categories: router({
    // Get all categories
    getAll: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),

    // Get category by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getCategoryById(input.id);
      }),
  }),

  subscriptions: router({
    // Get all subscription plans
    getPlans: publicProcedure.query(async () => {
      return await db.getAllSubscriptionPlans();
    }),

    // Get plan by ID
    getPlanById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getSubscriptionPlanById(input.id);
      }),
  }),

  favorites: router({
    // Get user favorites
    getMy: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserFavorites(ctx.user.id);
    }),

    // Add to favorites
    add: protectedProcedure
      .input(z.object({ bookId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.addFavorite(ctx.user.id, input.bookId);
      }),

    // Remove from favorites
    remove: protectedProcedure
      .input(z.object({ bookId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.removeFavorite(ctx.user.id, input.bookId);
      }),
  }),

  reading: router({
    // Get user reading progress
    getProgress: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserReadingProgress(ctx.user.id);
    }),

    // Update reading progress
    updateProgress: protectedProcedure
      .input(
        z.object({
          bookId: z.number(),
          currentPage: z.number(),
          totalPages: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return await db.updateReadingProgress(
          ctx.user.id,
          input.bookId,
          input.currentPage,
          input.totalPages
        );
      }),
  }),

  cart: router({
    // Get user cart
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserCart(ctx.user.id);
    }),

    // Add to cart
    add: protectedProcedure
      .input(
        z.object({
          bookId: z.number(),
          quantity: z.number(),
          type: z.enum(["physical", "digital"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return await db.addToCart(
          ctx.user.id,
          input.bookId,
          input.quantity,
          input.type
        );
      }),

    // Remove from cart
    remove: protectedProcedure
      .input(z.object({ cartItemId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.removeFromCart(ctx.user.id, input.cartItemId);
      }),

    // Clear cart
    clear: protectedProcedure.mutation(async ({ ctx }) => {
      return await db.clearCart(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
