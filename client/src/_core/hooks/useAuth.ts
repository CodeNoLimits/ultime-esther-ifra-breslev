import { supabase } from "@/lib/supabase";
import { useState, useEffect, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";

interface AppUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }, []);

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) throw error;
      return data;
    },
    []
  );

  const appUser: AppUser | null = user
    ? {
        id: user.id,
        email: user.email || "",
        name:
          user.user_metadata?.name || user.email?.split("@")[0] || "Membre",
        role: user.user_metadata?.role || "user",
      }
    : null;

  return {
    user: appUser,
    session,
    loading,
    error: null,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refresh: async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
    },
  };
}
