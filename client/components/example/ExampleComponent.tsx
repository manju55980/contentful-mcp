"use client";

import React, { useState } from 'react';
import { useExample } from '@/hooks/useExample';

export function ExampleComponent() {
  const { items, loading, error, add, remove } = useExample();
  const [name, setName] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await add({ name: name.trim() });
    setName('');
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => remove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
