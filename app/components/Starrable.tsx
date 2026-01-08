import Star from "./Star";

function Starrable({
  children,
  isStarred,
  onClick,
  showOnlyOnHover = false,
}: {
  children: React.ReactNode;
  isStarred: boolean;
  onClick: () => void;
  showOnlyOnHover?: boolean;
}) {
  return (
    <div className="group relative">
      {children}
      <div
        className={`absolute top-2 right-2 ${showOnlyOnHover ? "hidden group-hover:block" : "opacity-90 hover:opacity-100"}`}
      >
        <Star onClick={onClick} isStarred={isStarred} />
      </div>
    </div>
  );
}

export default Starrable;
