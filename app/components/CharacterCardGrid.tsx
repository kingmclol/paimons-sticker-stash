"use client";

import { Character } from "@/lib/types";
import { useMemo, useState } from "react";
import CardGrid from "./CardGrid";
import CharacterCard from "./CharacterCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import StickyBottom from "./StickyBottom";
import StickyTop from "./StickyTop";

const pageSize = 50;

function CharacterCardGrid({ characters }: { characters: Character[] }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  let filteredCharacters = characters;
  if (query) {
    filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  const pagedCharacters = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredCharacters.slice(startIndex, startIndex + pageSize);
  }, [filteredCharacters, page]);

  return (
    <div className="flex flex-col gap-4">
      <StickyTop extraClasses="flex justify-center">
        <SearchBar
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          value={query}
          placeholder="Search character by name"
        />
      </StickyTop>
      <CardGrid
        items={pagedCharacters}
        renderCard={(character) => (
          <CharacterCard key={character.id} character={character} />
        )}
      />
      {filteredCharacters.length > 0 && (
        <StickyBottom>
          <Pagination
            page={page}
            numItems={filteredCharacters.length}
            pageSize={pageSize}
            setPage={setPage}
          />
        </StickyBottom>
      )}
    </div>
  );
}

export default CharacterCardGrid;
