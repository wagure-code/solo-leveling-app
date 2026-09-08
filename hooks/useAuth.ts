"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function initAuth() {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        if (!cancelled) {
          setUser(data.session.user);
          setAuthLoaded(true);
        }
        return;
      }

      // Belum ada sesi di getSession() -> coba paksa refresh sekali,
      // buat jaga-jaga token lama sempat "telat" ke-refresh pas app baru dibuka lagi.
      const { data: refreshed } = await supabase.auth.refreshSession();

      if (!cancelled) {
        setUser(refreshed.session?.user ?? null);
        setAuthLoaded(true);
      }
    }

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, authLoaded };
}