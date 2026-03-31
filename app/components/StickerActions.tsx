function StickerActions({
  showOnlyOnHover = false,
  children,
}: {
  showOnlyOnHover?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute top-2 right-2 flex items-center w-full justify-between gap-2 rounded-lg ${showOnlyOnHover ? "hidden group-hover:block" : ""}`}
    >
      {children}
    </div>
  );
}

export default StickerActions;
