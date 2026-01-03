"use client";

import { useState } from "react";
import { characters, sticker_sets } from "../generated/prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

function StashFilters({
  characters,
  sets,
}: {
  characters: characters[];
  sets: sticker_sets[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSet, setSelectedSet] = useState(
    searchParams.get("set") || "all",
  );
  const [selectedCharacter, setSelectedCharacter] = useState(
    searchParams.get("character") || "all",
  );
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`?${params.toString()}`);
  };
  return (
    <div>
      <select
        className="roundedlg w-24 border bg-white px-2 py-1 text-black"
        value={selectedSet}
        onChange={(e) => {
          setSelectedSet(e.target.value);
          updateSearchParams("set", e.target.value);
        }}
      >
        <option value={"all"}>All Sets</option>
        {sets.map((set) => (
          <option key={set.id} value={set.id}>
            Set {set.name}
          </option>
        ))}
      </select>
      <select
        className="roundedlg border bg-white px-2 py-1 text-black"
        value={selectedCharacter}
        onChange={(e) => {
          setSelectedCharacter(e.target.value);
          updateSearchParams("character", e.target.value);
        }}
      >
        <option value={"all"}>All Characters</option>
        {characters.map((character) => (
          <option key={character.id} value={character.id}>
            {character.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StashFilters;
