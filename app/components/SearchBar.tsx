function SearchBar({
  value,
  onChange,
  className = "w-4/5 rounded-xl border bg-black/75 px-4 py-2 text-center mx-auto",
  placeholder = "Search...",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}

export default SearchBar;
