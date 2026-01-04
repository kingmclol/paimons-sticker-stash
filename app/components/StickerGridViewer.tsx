"use client";
import { Sticker } from "@/lib/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import StickerGrid from "./StickerGrid";
import StickyTop from "./StickyTop";
import StickyBottom from "./StickyBottom";

const pageSize = 50;

function StickerGridViewer({ stickers }: { stickers: Sticker[] }) {
  const [query, setQuery] = useState("");
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const [favoriteStickerIds] = useLocalStorageState<number[]>(
    [],
    "favouriteStickerIds",
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const filteredStickers = useMemo(() => {
    let filteredStickers = stickers;
    if (favouritesOnly) {
      filteredStickers = filteredStickers.filter((sticker) =>
        favoriteStickerIds.includes(sticker.id),
      );
    }

    if (query) {
      filteredStickers = filteredStickers.filter((sticker) =>
        sticker.full_title.toLowerCase().includes(query.toLowerCase()),
      );
    }
    return filteredStickers;
  }, [stickers, favouritesOnly, query, favoriteStickerIds]);

  const pagedStickers = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredStickers.slice(startIndex, startIndex + pageSize);
  }, [filteredStickers, page]);

  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <StickyTop>
        <div className="mx-auto flex w-4/5 justify-center gap-12">
          <SearchBar
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            value={query}
            placeholder="Search stickers..."
          />
          <div className="flex items-center gap-2 rounded-xl border bg-black/75 px-4 py-2">
            <label htmlFor="favouritesOnly" className="select-none">
              Favourites
            </label>
            <input
              className="h-4 w-4"
              type="checkbox"
              checked={favouritesOnly}
              onChange={(e) => {
                setFavouritesOnly(e.target.checked);
                setPage(1);
              }}
            />
          </div>
        </div>
      </StickyTop>
      <StickerGrid stickers={pagedStickers} />
      {filteredStickers.length > 0 && (
        <StickyBottom>
          <Pagination
            pageSize={pageSize}
            page={page}
            setPage={setPage}
            numItems={filteredStickers.length}
          />
        </StickyBottom>
      )}
    </div>
  );
}

export default StickerGridViewer;
