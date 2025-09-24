'use client';

import { useState } from 'react';
import SearchBar from '../molecules/SearchBar';
import SearchResults from './SearchResults';

export default function ClientSearch() {
  const [query, setQuery] = useState('');

  return (
    <section>
      <SearchBar query={query} setQuery={setQuery} />
      <SearchResults query={query} />
    </section>
  );
}