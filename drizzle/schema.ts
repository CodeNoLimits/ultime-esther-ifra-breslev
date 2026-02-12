import { integer, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 */
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role", { enum: ["user", "admin"] })
    .default("user")
    .notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Categories for books (themes)
 */
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nameEn: text("nameEn").notNull(),
  nameFr: text("nameFr").notNull(),
  nameHe: text("nameHe"),
  slug: text("slug").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Books and brochures catalog
 */
export const books = sqliteTable("books", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titleEn: text("titleEn").notNull(),
  titleFr: text("titleFr").notNull(),
  titleHe: text("titleHe"),
  slug: text("slug").notNull().unique(),
  descriptionEn: text("descriptionEn"),
  descriptionFr: text("descriptionFr"),
  descriptionHe: text("descriptionHe"),
  author: text("author").notNull(),
  categoryId: integer("categoryId").references(() => categories.id),
  type: text("type", { enum: ["book", "brochure"] }).notNull(),

  pages: integer("pages"),
  language: text("language", { enum: ["fr", "en", "he", "es", "ru"] }).default(
    "fr"
  ),

  // Pricing & Inventory
  pricePhysical: real("pricePhysical"), // SQLite real for decimal/float
  priceDigital: real("priceDigital"),
  inStock: integer("inStock", { mode: "boolean" }).default(true),

  // Specs
  weight: integer("weight"), // grams
  dimensions: text("dimensions"), // e.g. "15x21"

  // Digital Assets
  coverImageUrl: text("coverImageUrl"),
  pdfUrl: text("pdfUrl"), // For digital reading
  previewPdfUrl: text("previewPdfUrl"), // Sample pages

  // Flags
  featured: integer("featured", { mode: "boolean" }).default(false),
  includedInSubscription: integer("includedInSubscription", {
    mode: "boolean",
  }).default(true),

  createdAt: integer("createdAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export type Book = typeof books.$inferSelect;
export type InsertBook = typeof books.$inferInsert;

/**
 * Subscription Plans
 */
export const subscriptionPlans = sqliteTable("subscription_plans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nameEn: text("nameEn").notNull(),
  nameFr: text("nameFr").notNull(),
  nameHe: text("nameHe"),
  slug: text("slug").notNull().unique(),
  descriptionEn: text("descriptionEn"),
  descriptionFr: text("descriptionFr"),
  descriptionHe: text("descriptionHe"),

  price: real("price").notNull(),
  currency: text("currency").default("ILS").notNull(), // ILS by default

  duration: text("duration", {
    enum: ["monthly", "yearly", "family"],
  }).notNull(),
  maxDevices: integer("maxDevices").default(1),

  active: integer("active", { mode: "boolean" }).default(true),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;

/**
 * User Subscriptions
 */
export const subscriptions = sqliteTable("subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  planId: integer("planId")
    .references(() => subscriptionPlans.id)
    .notNull(),

  status: text("status", {
    enum: ["active", "cancelled", "expired", "past_due"],
  })
    .default("active")
    .notNull(),

  startDate: integer("startDate", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  endDate: integer("endDate", { mode: "timestamp" }).notNull(),

  paymentMethodId: text("paymentMethodId"), // Stripe ID or similar
  subscriptionId: text("subscriptionId"), // Stripe Subscription ID

  autoRenew: integer("autoRenew", { mode: "boolean" }).default(true),

  createdAt: integer("createdAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),
});

/**
 * User Reading Progress
 */
export const readingProgress = sqliteTable("reading_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  bookId: integer("bookId")
    .references(() => books.id)
    .notNull(),

  currentPage: integer("currentPage").default(0).notNull(),
  totalPages: integer("totalPages").notNull(),
  progressPercent: integer("progressPercent").default(0),

  completed: integer("completed", { mode: "boolean" }).default(false),
  lastReadAt: integer("lastReadAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

/**
 * User Favorites
 */
export const favorites = sqliteTable(
  "favorites",
  {
    userId: integer("userId")
      .references(() => users.id)
      .notNull(),
    bookId: integer("bookId")
      .references(() => books.id)
      .notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  table => ({
    // Composite PK for many-to-many
    pk: primaryKey({ columns: [table.userId, table.bookId], name: "favorites_pk" }),
  })
);

/**
 * Cart (for physical books or one-off purchases)
 */
export const cartItems = sqliteTable("cart_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  bookId: integer("bookId")
    .references(() => books.id)
    .notNull(),

  quantity: integer("quantity").default(1).notNull(),
  type: text("type", { enum: ["physical", "digital"] })
    .default("physical")
    .notNull(),

  addedAt: integer("addedAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

/**
 * Orders history
 */
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),

  totalAmount: real("totalAmount").notNull(),
  currency: text("currency").default("ILS").notNull(),

  status: text("status", {
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
  }).default("pending"),
  paymentStatus: text("paymentStatus", {
    enum: ["pending", "paid", "failed"],
  }).default("pending"),

  shippingAddress: text("shippingAddress"), // JSON string or text

  createdAt: integer("createdAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("orderId")
    .references(() => orders.id)
    .notNull(),
  bookId: integer("bookId")
    .references(() => books.id)
    .notNull(),

  quantity: integer("quantity").notNull(),
  priceAtPurchase: real("priceAtPurchase").notNull(),
  type: text("type", { enum: ["physical", "digital"] }).notNull(),
});

/**
 * Reviews / Comments
 */
export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  bookId: integer("bookId")
    .references(() => books.id)
    .notNull(),

  rating: integer("rating"), // 1-5
  comment: text("comment"),

  approved: integer("approved", { mode: "boolean" }).default(false),

  createdAt: integer("createdAt", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});
