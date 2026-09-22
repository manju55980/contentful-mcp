"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { CreateExamplePayload, ExampleItem } from '@/lib/example/types';

export function useExample() {
  const [items, setItems] = useState<ExampleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from('example').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }

  async function add(payload: CreateExamplePayload) {
    const { data, error } = await supabase.from('example').insert(payload).select().single();
    if (error) throw new Error(error.message);
    setItems((prev) => [data, ...prev]);
    return data as ExampleItem;
  }

  async function remove(id: string) {
    const { error } = await supabase.from('example').delete().eq('id', id);
    if (error) throw new Error(error.message);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return { items, loading, error, add, remove, reload: load };
}
