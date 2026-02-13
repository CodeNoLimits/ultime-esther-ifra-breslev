import { createClient } from "@libsql/client";
import { and, asc, desc, eq, gte, inArray, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  InsertUser,
  books,
  cartItems,
  categories,
  favorites,
  readingProgress,
  subscriptionPlans,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

// Environment-aware DB connection:
// - Turso cloud (Vercel/production): uses TURSO_DATABASE_URL + TURSO_AUTH_TOKEN
// - Local dev: falls back to file:sqlite.db
const client = process.env.TURSO_DATABASE_URL
  ? createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  : createClient({
      url: `file:${join(dirname(fileURLToPath(import.meta.url)), "..", "sqlite.db")}`,
    });

const db = drizzle(client);

export async function getDb() {
  return db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Books queries
export async function getAllBooks() {
  return await db.select().from(books).orderBy(desc(books.createdAt));
}

export async function getFeaturedBooks() {
  return await db.select().from(books).where(eq(books.featured, true)).limit(3); // SQLite stores boolean as 1/0, Drizzle handles mapping
}

export async function getBookBySlug(slug: string) {
  const result = await db
    .select()
    .from(books)
    .where(eq(books.slug, slug))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getBookById(id: number) {
  const result = await db.select().from(books).where(eq(books.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

interface BookFilters {
  type?: string[];
  language?: string[];
  categoryId?: number[];
  priceMin?: number;
  priceMax?: number;
  author?: string[];
}

export async function getFilteredBooks(
  filters: BookFilters,
  sortBy: string = "newest"
) {
  let query = db.select().from(books);
  const conditions = [];

  if (filters.type && filters.type.length > 0) {
    conditions.push(inArray(books.type, filters.type as any));
  }

  if (filters.language && filters.language.length > 0) {
    conditions.push(inArray(books.language, filters.language as any));
  }

  if (filters.categoryId && filters.categoryId.length > 0) {
    conditions.push(inArray(books.categoryId, filters.categoryId));
  }

  if (filters.priceMin !== undefined) {
    conditions.push(gte(books.pricePhysical, filters.priceMin));
  }

  if (filters.priceMax !== undefined) {
    conditions.push(lte(books.pricePhysical, filters.priceMax));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  // Apply sorting
  switch (sortBy) {
    case "price-asc":
      query = query.orderBy(asc(books.pricePhysical)) as any;
      break;
    case "price-desc":
      query = query.orderBy(desc(books.pricePhysical)) as any;
      break;
    case "newest":
    default:
      query = query.orderBy(desc(books.createdAt)) as any;
      break;
  }

  return await query;
}

// Categories queries
export async function getAllCategories() {
  return await db.select().from(categories);
}

export async function getCategoryById(id: number) {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

// Subscription Plans queries
export async function getAllSubscriptionPlans() {
  return await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.active, true));
}

export async function getSubscriptionPlanById(id: number) {
  const result = await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

// User favorites
export async function getUserFavorites(userId: number) {
  const result = await db
    .select({
      book: books,
      favorite: favorites,
    })
    .from(favorites)
    .innerJoin(books, eq(favorites.bookId, books.id))
    .where(eq(favorites.userId, userId));

  return result.map(r => r.book);
}

export async function addFavorite(userId: number, bookId: number) {
  await db.insert(favorites).values({ userId, bookId });
  return true;
}

export async function removeFavorite(userId: number, bookId: number) {
  await db
    .delete(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.bookId, bookId)));
  return true;
}

// Reading progress
export async function getUserReadingProgress(userId: number) {
  const result = await db
    .select({
      book: books,
      progress: readingProgress,
    })
    .from(readingProgress)
    .innerJoin(books, eq(readingProgress.bookId, books.id))
    .where(eq(readingProgress.userId, userId))
    .orderBy(desc(readingProgress.lastReadAt));

  return result;
}

export async function updateReadingProgress(
  userId: number,
  bookId: number,
  currentPage: number,
  totalPages: number
) {
  const progressPercent = Math.round((currentPage / totalPages) * 100);
  const completed = progressPercent >= 100;

  const existing = await db
    .select()
    .from(readingProgress)
    .where(
      and(
        eq(readingProgress.userId, userId),
        eq(readingProgress.bookId, bookId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(readingProgress)
      .set({
        currentPage,
        totalPages,
        progressPercent,
        completed,
        lastReadAt: new Date(),
      })
      .where(
        and(
          eq(readingProgress.userId, userId),
          eq(readingProgress.bookId, bookId)
        )
      );
  } else {
    await db.insert(readingProgress).values({
      userId,
      bookId,
      currentPage,
      totalPages,
      progressPercent,
      completed,
      lastReadAt: new Date(),
    });
  }

  return true;
}

// Cart
export async function getUserCart(userId: number) {
  const result = await db
    .select({
      book: books,
      cartItem: cartItems,
    })
    .from(cartItems)
    .innerJoin(books, eq(cartItems.bookId, books.id))
    .where(eq(cartItems.userId, userId));

  return result;
}

export async function addToCart(
  userId: number,
  bookId: number,
  quantity: number,
  type: "physical" | "digital"
) {
  const existing = await db
    .select()
    .from(cartItems)
    .where(
      and(
        eq(cartItems.userId, userId),
        eq(cartItems.bookId, bookId),
        eq(cartItems.type, type)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(cartItems)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItems.id, existing[0].id));
  } else {
    await db.insert(cartItems).values({ userId, bookId, quantity, type });
  }

  return true;
}

export async function removeFromCart(userId: number, cartItemId: number) {
  await db
    .delete(cartItems)
    .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)));
  return true;
}

export async function clearCart(userId: number) {
  await db.delete(cartItems).where(eq(cartItems.userId, userId));
  return true;
}
