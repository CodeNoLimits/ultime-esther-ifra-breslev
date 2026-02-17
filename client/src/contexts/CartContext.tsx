import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

// ── Types ──────────────────────────────────────────────────────────────────

/** Minimal book info kept in localStorage for offline display */
export interface CartBook {
  id: number;
  titleFr: string;
  titleHe?: string | null;
  author: string;
  slug: string;
  coverImageUrl?: string | null;
  pricePhysical?: number | null;
  priceDigital?: number | null;
  weight?: number | null;
  dimensions?: string | null;
  pdfUrl?: string | null;
  type?: string | null;
  language?: string | null;
  featured?: boolean | number | null;
  includedInSubscription?: boolean | number | null;
  descriptionFr?: string | null;
  pages?: number | null;
  [key: string]: unknown; // allow extra book fields
}

export interface CartItemData {
  id: number;          // cart item ID (local auto-increment or server id)
  bookId: number;
  quantity: number;
  type: "physical" | "digital";
  addedAt?: Date | null;
}

/** The shape each cart entry has (mirrors server response) */
export interface CartEntry {
  book: CartBook;
  cartItem: CartItemData;
}

interface CartContextType {
  /** Full cart entries with book + cartItem */
  items: CartEntry[];
  /** Whether cart data is still loading */
  isLoading: boolean;
  /** Total number of items (sum of quantities) */
  count: number;
  /** Add an item to cart */
  addItem: (book: CartBook, type: "physical" | "digital", quantity?: number) => void;
  /** Remove an item by its cartItem id */
  removeItem: (cartItemId: number) => void;
  /** Update quantity for a cart item */
  updateQuantity: (cartItemId: number, quantity: number) => void;
  /** Clear all items */
  clearCart: () => void;
  /** Force refetch from server (for authenticated users) */
  refetch: () => void;
}

// ── LocalStorage helpers ───────────────────────────────────────────────────

const CART_KEY = "esther-cart";
let nextLocalId = -1; // negative IDs for local-only items

function loadCartFromStorage(): CartEntry[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartEntry[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("Cart save to localStorage failed:", err);
  }
}

// ── Context ────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [localItems, setLocalItems] = useState<CartEntry[]>(loadCartFromStorage);
  const hasHydratedFromServer = useRef(false);

  // ── Server queries (only when authenticated) ──────────────────────────

  const {
    data: serverItems,
    isLoading: serverLoading,
    refetch: serverRefetch,
  } = trpc.cart.get.useQuery(undefined, {
    enabled: isAuthenticated,
    // On successful server fetch, sync to local state + localStorage
    refetchOnWindowFocus: false,
  });

  const addMutation = trpc.cart.add.useMutation({
    onSuccess: () => {
      serverRefetch();
    },
  });

  const removeMutation = trpc.cart.remove.useMutation({
    onSuccess: () => {
      serverRefetch();
    },
  });

  const clearMutation = trpc.cart.clear.useMutation({
    onSuccess: () => {
      serverRefetch();
    },
  });

  // ── Sync server → local when server data arrives ──────────────────────

  useEffect(() => {
    if (isAuthenticated && serverItems && !serverLoading) {
      const entries: CartEntry[] = serverItems.map((item: any) => ({
        book: item.book,
        cartItem: {
          id: item.cartItem.id,
          bookId: item.cartItem.bookId,
          quantity: item.cartItem.quantity,
          type: item.cartItem.type,
          addedAt: item.cartItem.addedAt,
        },
      }));
      setLocalItems(entries);
      saveCartToStorage(entries);
      hasHydratedFromServer.current = true;
    }
  }, [isAuthenticated, serverItems, serverLoading]);

  // ── Persist local changes to localStorage ─────────────────────────────

  useEffect(() => {
    // Only save if we're not authenticated (otherwise server is source of truth)
    // Or if server has already hydrated and we're just mirroring
    saveCartToStorage(localItems);
  }, [localItems]);

  // ── Cart operations ───────────────────────────────────────────────────

  const addItem = useCallback(
    (book: CartBook, type: "physical" | "digital", quantity: number = 1) => {
      if (isAuthenticated) {
        // Server-side add
        addMutation.mutate({ bookId: book.id, quantity, type });
      }

      // Optimistic local update
      setLocalItems((prev) => {
        const existing = prev.find(
          (e) => e.cartItem.bookId === book.id && e.cartItem.type === type
        );
        if (existing) {
          return prev.map((e) =>
            e.cartItem.bookId === book.id && e.cartItem.type === type
              ? {
                  ...e,
                  cartItem: {
                    ...e.cartItem,
                    quantity: e.cartItem.quantity + quantity,
                  },
                }
              : e
          );
        }
        return [
          ...prev,
          {
            book,
            cartItem: {
              id: nextLocalId--,
              bookId: book.id,
              quantity,
              type,
              addedAt: new Date(),
            },
          },
        ];
      });
    },
    [isAuthenticated, addMutation]
  );

  const removeItem = useCallback(
    (cartItemId: number) => {
      if (isAuthenticated) {
        removeMutation.mutate({ cartItemId });
      }

      // Optimistic local update
      setLocalItems((prev) => prev.filter((e) => e.cartItem.id !== cartItemId));
    },
    [isAuthenticated, removeMutation]
  );

  const updateQuantity = useCallback(
    (cartItemId: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(cartItemId);
        return;
      }

      // For server: no updateQuantity endpoint exists, so we do it locally only
      // Server will sync on next refetch
      setLocalItems((prev) =>
        prev.map((e) =>
          e.cartItem.id === cartItemId
            ? { ...e, cartItem: { ...e.cartItem, quantity } }
            : e
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    if (isAuthenticated) {
      clearMutation.mutate();
    }
    setLocalItems([]);
    saveCartToStorage([]);
  }, [isAuthenticated, clearMutation]);

  const refetch = useCallback(() => {
    if (isAuthenticated) {
      serverRefetch();
    }
  }, [isAuthenticated, serverRefetch]);

  // ── Derived values ────────────────────────────────────────────────────

  const count = localItems.reduce((sum, e) => sum + e.cartItem.quantity, 0);
  const isLoading = isAuthenticated ? serverLoading && !hasHydratedFromServer.current : false;

  return (
    <CartContext.Provider
      value={{
        items: localItems,
        isLoading,
        count,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
