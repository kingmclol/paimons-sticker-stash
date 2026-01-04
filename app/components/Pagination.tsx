import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function Pagination({
  page,
  setPage,
  numItems,
  pageSize,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  numItems: number;
  pageSize: number;
}) {
  const numPages = Math.ceil(numItems / pageSize);
  const numItemsPaged = Math.min(pageSize, numItems - (page - 1) * pageSize);
  return (
    <div className="bg-background/75 mx-auto mt-2 flex w-3/4 items-center justify-between gap-4 rounded-lg border px-4 py-2 text-center lg:w-1/2">
      <button
        className="flex items-center gap-2 rounded-full border px-2 py-1 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <HiChevronLeft />
        <span className="hidden sm:inline">Prev</span>
      </button>
      <div>
        Showing <span className="font-bold">{(page - 1) * pageSize + 1}</span>{" "}
        to{" "}
        <span className="font-bold">
          {(page - 1) * pageSize + numItemsPaged}
        </span>{" "}
        of <span className="font-bold">{numItems}</span>
      </div>
      <button
        className="flex items-center gap-2 rounded-full border px-2 py-1 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        disabled={page === numPages}
        onClick={() => setPage(page + 1)}
      >
        <span className="hidden sm:inline">Next</span>
        <HiChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
